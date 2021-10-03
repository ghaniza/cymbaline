import { container, InjectionToken } from 'tsyringe'
import express, { Express, RequestHandler, Router, Response, Request, NextFunction } from 'express'
import { CustomMiddleware } from './middlewares'
import { DefaultLogger } from './utils/logger'
import { HTTPException } from './exceptions/http.exception'
import ServerlessHttp from 'serverless-http'
import { APIGatewayEvent, Callback, Context, SQSEvent, SQSRecord } from 'aws-lambda'

type ServerConfigurationOptions = {
    dependencies: ((...args: any[]) => Promise<any> | any)[]
    middlewares: (RequestHandler | { new (): CustomMiddleware })[]
    controllers: Function[]
    queues: Function[]
}

export interface Logger {
    log: (level: 'debug' | 'info' | 'warn' | 'error', ...args: any[]) => void
}

export type ErrorHandler = (e: Error, request: Request, response: Response, logger: Logger) => Promise<any> | any

export interface ServerOptions {
    logger?: Logger
    errorHandler?: ErrorHandler
}

export class Server {
    private readonly app: Express
    private readonly logger: Logger = new DefaultLogger()
    private readonly errorHandler: ErrorHandler = HTTPException.handler

    constructor(private readonly configuration: ServerConfigurationOptions, options?: ServerOptions) {
        this.app = express()
        this.loadGlobalMiddlewares()

        if (options) {
            if (options?.logger) {
                this.logger = options.logger
            }

            if (options?.errorHandler) {
                this.errorHandler = options.errorHandler
            }
        }
    }

    public async disable(setting: string) {
        this.app.disable(setting)
    }

    public set(setting: string, value: any) {
        this.app.set(setting, value)
    }

    private loadGlobalMiddlewares() {
        this.configuration.middlewares.forEach((middleware) => {
            if (middleware.prototype instanceof CustomMiddleware) {
                const mw = container.resolve<CustomMiddleware>(middleware as any)
                this.app.use(async (request: Request, response: Response, next: NextFunction) => {
                    await mw.configure.bind(mw)({
                        request,
                        response,
                    })

                    next()
                })
            } else {
                this.app.use(middleware as RequestHandler)
            }
        })
    }

    private async configureDependencies() {
        await Promise.all(this.configuration.dependencies.map(async (d) => await d()))
    }

    private getArgumentsByType(args: any[], req: Request, res: Response) {
        return args.map((arg) => {
            if (!arg) return undefined

            switch (arg.type) {
                case 'body':
                    return arg.key ? req.body[arg.key] : req.body
                case 'param':
                    return arg.key ? req.params[arg.key] : req.params
                case 'query':
                    return arg.key ? req.query[arg.key] : req.query
                case 'req':
                    return req
                case 'res':
                    return res
                default:
                    return undefined
            }
        })
    }

    private getArgumentsByEvent(args: any[], record: SQSRecord) {
        return args.map((arg) => {
            if (!arg) return undefined

            switch (arg.type) {
                case 'body':
                    return record.body
                default:
                    return record[arg.type]
            }
        })
    }

    private configureControllers() {
        const controllers: any[] = this.configuration.controllers.map((c) =>
            container.resolve<typeof c>(c as InjectionToken<Function>)
        )

        controllers.forEach((controller) => {
            this.logger.log('info', `[server] Controller ${controller.controllerName}: Mapped to "${controller.path}"`)
            const router = Router()

            if (controller.middlewares?.length)
                controller.middlewares.forEach((middleware) => {
                    let mw = middleware

                    if (middleware.prototype instanceof CustomMiddleware) {
                        const instance = container.resolve<CustomMiddleware>(middleware as any)
                        mw = async (req, res, next) => {
                            await instance.configure.bind(instance)({
                                request: req,
                                response: res,
                            })
                            next()
                        }
                    }
                    router.use(mw)
                })

            Reflect.getMetadataKeys(controller).forEach((key) => {
                const route = Reflect.getMetadata(key, controller)

                if (controller.path === '/') controller.path = ''

                let middlewares = []

                if (route.middlewares.length)
                    middlewares = route.middlewares.map((middleware) => {
                        if (middleware.prototype instanceof CustomMiddleware) {
                            const mw = container.resolve<CustomMiddleware>(middleware as any)
                            return async (req, res, next) => {
                                await mw.configure.bind(mw)({ request: req, response: res })
                                next()
                            }
                        }

                        return middleware
                    })

                router[route.method](
                    controller.path + route.path,
                    ...middlewares,
                    async (req: Request, res: Response, next: NextFunction) => {
                        try {
                            route.headers.forEach(([header, value]) => {
                                res.setHeader(header, value)
                            })
                            const args = this.getArgumentsByType(route.arguments, req, res)
                            const response = await route.handler.bind(controller)(...args)

                            if (route.arguments.find((a) => a && a?.type === 'res' && a?.skip)) return next()
                            return res.status(route.httpCode).send(response)
                        } catch (e) {
                            next(e)
                        }
                    }
                )
            })

            this.app.use(router)
        })
    }

    private async initHttp() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            req.timestamp = Date.now()
            const showLog = () => {
                const host = req.hostname
                const user = req.user
                const duration = Date.now() - req.timestamp
                const method = req.method.toUpperCase()
                const bytes = res.getHeader('content-length')
                const status = res.statusCode
                const path = req.path
                const protocol = req.protocol.toUpperCase() + req.httpVersion

                let level: string

                switch (true) {
                    case status >= 400 && status < 500:
                        level = 'warn'
                        break
                    case status >= 500:
                        level = 'error'
                        break
                    default:
                        level = 'info'
                        break
                }

                const log = `[server] ${host} ${user ?? '-'} [${new Date(
                    req.timestamp
                ).toUTCString()}] "${method} ${path} ${protocol}" ${status} ${bytes ?? 0} -- ${duration}ms`
                this.logger.log(level as any, log)

                next()
            }

            req.on('close', showLog)
            req.on('end', showLog)

            next()
        })

        await this.configureDependencies()
        this.configureControllers()

        this.app.use(async (e: Error, req: Request, res: Response, next: NextFunction) => {
            if (this.errorHandler) return this.errorHandler(e, req, res, this.logger)
            return next()
        })
    }

    private initSQS(queueId: string, event: SQSEvent) {
        const queue = this.configuration.queues.find((q) => q.prototype.queueId === queueId)
        if (!queue) throw new Error(`Queue not found: "${queueId}"`)

        const queueHandler = Reflect.getMetadata('handler', queue)

        return Promise.all(
            event.Records.map(async (record) => {
                const args = this.getArgumentsByEvent(queueHandler.arguments, record)

                await Promise.all(
                    this.configuration.middlewares.map(async (mw) => {
                        if (!(mw instanceof CustomMiddleware)) return
                        const middleware = container.resolve<CustomMiddleware>(mw as any)

                        await middleware.configure.bind(middleware)({ record })
                    })
                ).catch((e) => {
                    this.logger.log('error', e.message)
                })
                return queueHandler.handler.bind(queue)(...args)
            })
        )
    }

    public startServer(port?: number) {
        this.initHttp().then(() => {
            this.app.listen(port, () => {
                this.logger.log('info', '[server] Listening to port ' + port)
            })
        })
    }

    public getApiHandler(options?: { context?: Partial<Context> }): Function {
        return ServerlessHttp(this.app, {
            request: async (req: any, event: APIGatewayEvent, context: Context) => {
                if (options && options.context) {
                    context = { ...context, ...options.context }
                }

                await this.initHttp()

                req.event = event
                req.context = context
            },
        })
    }

    public getQueueHandler(id: string, options?: { context?: Partial<Context> }) {
        return async (event: SQSEvent, context: Context, callback: Callback) => {
            try {
                if (options && options.context) context = { ...context, ...options.context }
                await this.initSQS(id, event)
            } catch (e) {
                return callback(e)
            }
        }
    }
}
