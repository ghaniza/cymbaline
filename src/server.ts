import { container } from 'tsyringe'
import express, { Express, RequestHandler, Router, Response, Request, NextFunction } from 'express'
import { CustomMiddleware } from './middlewares'
import { DefaultLogger } from './utils/logger'
import { HTTPException } from './exceptions/http.exception'
import ServerlessHttp from 'serverless-http'
import { APIGatewayEvent, Callback, Context, SQSEvent, SQSRecord } from 'aws-lambda'
import qs from 'qs'
import path from 'path'
import fs from 'fs'
import { Serverless } from './utils/serverless'

type ServerConfigurationOptions = {
    dependencies: ((...args: any[]) => Promise<any> | any)[]
    middlewares: (RequestHandler | { new (): CustomMiddleware })[]
    controllers: { new (...args: any[]): any }[]
    queues: { new (...args: any[]): any }[]
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
    private readonly metadataDir = path.resolve('.cymbaline')

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

            if (arg.type === 'body') {
                if (record?.messageAttributes) {
                    const name = Object.keys(record.messageAttributes).find((k) => k.toLowerCase() === 'content-type')
                    if (!name) return record.body

                    const contentType = record.messageAttributes[name]

                    if (contentType.dataType === 'String') {
                        const value = contentType.stringValue

                        if (value.includes('application/json')) {
                            if (arg.key) return JSON.parse(record.body)[arg.key]
                            return JSON.parse(record.body)
                        } else if (value.includes('application/x-www-form-urlencoded')) {
                            if (arg.key) return qs.parse(record.body)[arg.key]
                            return qs.parse(record.body)
                        }
                    }
                }

                return record.body
            }

            return record[arg.type]
        })
    }

    private configureControllers() {
        const controllers: any[] = this.configuration.controllers.map((c) => ({
            instance: container.resolve<typeof c>(c as any),
            cls: c,
        }))

        controllers.forEach(({ instance, cls }) => {
            this.logger.log('info', `[server] Controller ${instance.controllerName}: Mapped to "${instance.path}"`)

            const router = Router()

            const controllerMiddlewares = Reflect.getMetadata(cls.uid + ':middlewares', instance, 'middlewares') ?? []
            const middlewares = []

            if (controllerMiddlewares?.length) {
                controllerMiddlewares.forEach((middleware) => {
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
                    middlewares.push(mw)
                })
            }

            Reflect.getMetadataKeys(instance).forEach((key) => {
                const route = Reflect.getMetadata(key, instance)
                if (instance.path === '/') instance.path = ''

                let localMiddlewares = []

                if (route.middlewares?.length)
                    localMiddlewares = route.middlewares.map((middleware) => {
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
                    instance.path + route.path,
                    [...middlewares, ...localMiddlewares],
                    async (req: Request, res: Response, next: NextFunction) => {
                        try {
                            route.headers.forEach(([header, value]) => {
                                res.setHeader(header, value)
                            })
                            const args = this.getArgumentsByType(route.arguments, req, res)
                            const response = await route.handler.bind(instance)(...args)

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

                if (!res.headersSent) next()
            }

            req.on('end', showLog)
            res.on('finish', showLog)

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
        let queue: any
        let QueueClass: any
        this.configuration.queues.forEach((q) => {
            if (queue) return
            const instance: any = container.resolve(q as any)
            if ((q as any).queueId === queueId) {
                queue = instance
                QueueClass = q
            }
        })

        if (!queue) throw new Error(`Queue not found: "${queueId}"`)

        const queueHandler = Reflect.getMetadata('handler', queue)
        const middlewares = []
        this.configuration.middlewares.forEach((mw) => {
            if (mw.prototype instanceof CustomMiddleware) {
                const middleware = container.resolve<CustomMiddleware>(mw as any)
                middlewares.push(middleware.configure.bind(middleware))
            }
        })

        const queueMiddlewares = Reflect.getMetadata(QueueClass.uid + ':middlewares', queue, 'middlewares')

        if (queueMiddlewares?.length) {
            queueMiddlewares.forEach((mw) => {
                if (mw.prototype instanceof CustomMiddleware) {
                    const middleware = container.resolve<CustomMiddleware>(mw as any)
                    middlewares.push(middleware.configure.bind(middleware))
                }
            })
        }

        return Promise.all(
            event.Records.map(async (record) => {
                await Promise.all(
                    middlewares.map((mw) => {
                        return mw({ record })
                    })
                ).catch((e) => {
                    this.logger.log('error', e.message)
                })

                const args = this.getArgumentsByEvent(queueHandler.arguments, record)

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

    public exportHandlers(options?: { context?: Partial<Context> }): { [handlerName: string]: Function } {
        if (!fs.existsSync(this.metadataDir)) fs.mkdirSync(this.metadataDir)
        const exports: any = {}
        const serverless = new Serverless()

        if (this.configuration.controllers.length) {
            exports.apiHandler = this.getApiHandler(options)

            serverless.addFunction('apiHandler', {
                handler: 'dist/index.apiHandler',
                memorySize: 1024,
                timeout: 6,
                events: {
                    http: 'ANY /{proxy+}',
                },
            })
        }

        if (this.configuration.queues.length) {
            this.configuration.queues.forEach((queue) => {
                const name = (queue as any).queueId
                const q = container.resolve<any>(queue as any)

                exports[name] = this.getQueueHandler(name)

                if (!q.queueARN)
                    this.logger.log(
                        'warn',
                        `[server] The "${name}" queue does not have a valid ARN, current value is: ${q.queueARN}`
                    )
                else
                    serverless.addFunction(name, {
                        handler: 'dist/index.' + name,
                        memorySize: 1024,
                        timeout: 6,
                        events: {
                            sqs: q.queueARN,
                        },
                    })
            })
        }

        serverless.saveMetadata(this.metadataDir)
        this.logger.log('info', '[server] Server metadata updated')

        return exports
    }
}
