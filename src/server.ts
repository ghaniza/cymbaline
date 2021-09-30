import {container, InjectionToken} from "tsyringe";
import express, {Express, RequestHandler, Router, Response, Request, NextFunction} from "express"
import {Middleware} from "./middlewares";
import {DefaultLogger} from "./utils/logger";
import {HTTPException} from "./exceptions/http.exception";
import ServerlessHttp from "serverless-http";
import {APIGatewayEvent, Context} from "aws-lambda";

type ServerConfigurationOptions = {
    dependencies: ((...args: any[]) => Promise<any> | any)[];
    middlewares: (RequestHandler | Middleware)[];
    controllers: Function[];
    queues: Function[];
}

export interface Logger {
    log: (level: 'debug' | 'info' | 'warn' | 'error', ...args: any[]) => void;
}

export type ErrorHandler = (e: Error, request: Request, response: Response, logger: Logger) => Promise<any> | any;

export interface ServerOptions {
    logger?: Logger;
    errorHandler?: ErrorHandler;
}


export class Server {
    private readonly app: Express;
    private readonly logger: Logger = new DefaultLogger();
    private readonly errorHandler: ErrorHandler = HTTPException.handler;

    constructor(private readonly configuration: ServerConfigurationOptions, options?: ServerOptions) {
        this.app = express();

        this.app.use(express.json())

        if (options) {
            if (options?.logger) {
                this.logger = options.logger
            }

            if (options?.errorHandler) {
                this.errorHandler = options.errorHandler;
            }
        }
    }

    public async disable(setting: string) {
        this.app.disable(setting)
    }

    public set(setting: string, value: any) {
        this.app.set(setting, value)
    }

    private async configureDependencies() {
        await Promise.all(this.configuration.dependencies.map(async d => await d()))
    }

    private getArgumentByType(args: any[], req: Request, res: Response) {
        return args.map(arg => {
            if(!arg) return;

            switch (arg.type){
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
            }
        })
    }

    private configureControllers() {
        const controllers: any[] = this.configuration.controllers.map(c => container.resolve<typeof c>(c as InjectionToken<Function>))

        controllers.forEach(controller => {
            this.logger.log('info', `[server] Controller ${controller.controllerName}: Mapped to "${controller.path}"`)
            const router = Router()

            Reflect.getMetadataKeys(controller).forEach(key => {
                const route = Reflect.getMetadata(key, controller)

                if (controller.path === '/') controller.path = ""

                router[route.method](controller.path + route.path, async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        const args = this.getArgumentByType(route.arguments, req, res)
                        const response = await route.handler.bind(controller)(...args);

                        if(route.arguments.find(a => a.type === 'res' && a.skip)) return next();
                        return res.status(route.httpCode).send(response);
                    } catch (e) {
                        next(e)
                    }
                })
            })

            this.app.use(router)
        })
    }

    public async init() {
        this.logger.log('info', '[server] Initializing...')
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            req.timestamp = Date.now()

            req.on('close', () => {
                const host = req.hostname;
                const user = req.user;
                const duration = Date.now() - req.timestamp;
                const method = req.method.toUpperCase();
                const bytes = res.getHeader('content-length')
                const status = res.statusCode;
                const path = req.path;
                const protocol = req.protocol.toUpperCase() + req.httpVersion;

                let level: string;

                switch (true) {
                    case status >= 400 && status < 500:
                        level = 'warn'
                        break;
                    case status >= 500:
                        level = 'error'
                        break;
                    default:
                        level = 'info'
                        break;
                }

                const log = `[server] ${host} ${user ?? '-'} [${new Date(req.timestamp).toUTCString()}] "${method} ${path} ${protocol}" ${status} ${bytes} -- ${duration}ms`
                this.logger.log(level as any, log)

                next()
            })
            next()
        })

        await this.configureDependencies()
        this.configureControllers()

        this.app.use(async (e: Error, req: Request, res: Response, next: NextFunction) => {
            if (this.errorHandler)
                return this.errorHandler(e, req, res, this.logger)
            return next()
        })

        this.logger.log('info', '[server] Done.')
    }

    public startServer(port?: number) {
        this.app.listen(port, () => {
            this.logger.log('info', '[server] Listening to port 3000')
        })
    }

    public getApiHandler(options?: { context?: Partial<Context> }): Function {
        return ServerlessHttp(this.app, {
            request: async (req: any, event: APIGatewayEvent, context: Context) => {
                if (options && options.context) {
                    context = {...context, ...options.context}
                }

                await this.init()

                req.event = event
                req.context = context
            }
        })
    }
}