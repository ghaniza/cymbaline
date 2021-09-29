import {container, InjectionToken} from "tsyringe";
import express, {Express, RequestHandler, Router, Response, Request, NextFunction} from "express"
import {Middleware} from "./middlewares";
import {DefaultLogger} from "./utils/logger";
import {HTTPException} from "./exceptions/http.exception";

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

    private configureControllers() {
        const controllers: any[] = this.configuration.controllers.map(c => container.resolve<typeof c>(c as InjectionToken<Function>))

        controllers.forEach(controller => {
            this.logger.log('info', `[server] Controller ${controller.controllerName}: Mapped to "${controller.path}"`)
            const router = Router()

            console.log(controller)

            controller.router.forEach(route => {
                if (controller.path === '/') controller.path = ""

                router[route.method](controller.path + route.path, async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        const response = await route.handler.bind(controller)();
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

            req.on('end', () => {
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

                const log = `[server]: ${host} ${user ?? '-'} [${new Date(req.timestamp).toUTCString()}] "${method} ${path} ${protocol}" ${status} ${bytes} -- ${duration}ms`
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
        this.app.listen(3000, () => {
            this.logger.log('info', '[server] Listening to port 3000')
        })
    }
}