import { RequestHandler, Response, Request } from 'express';
import { CustomMiddleware } from './middlewares';
import { Callback, Context, SQSEvent } from 'aws-lambda';
declare type ServerConfigurationOptions = {
    dependencies: ((...args: any[]) => Promise<any> | any)[];
    middlewares: (RequestHandler | {
        new (): CustomMiddleware;
    })[];
    controllers: Function[];
    queues: Function[];
};
export interface Logger {
    log: (level: 'debug' | 'info' | 'warn' | 'error', ...args: any[]) => void;
}
export declare type ErrorHandler = (e: Error, request: Request, response: Response, logger: Logger) => Promise<any> | any;
export interface ServerOptions {
    logger?: Logger;
    errorHandler?: ErrorHandler;
}
export declare class Server {
    private readonly configuration;
    private readonly app;
    private readonly logger;
    private readonly errorHandler;
    constructor(configuration: ServerConfigurationOptions, options?: ServerOptions);
    disable(setting: string): Promise<void>;
    set(setting: string, value: any): void;
    private loadGlobalMiddlewares;
    private configureDependencies;
    private getArgumentsByType;
    private getArgumentsByEvent;
    private configureControllers;
    private initHttp;
    private initSQS;
    startServer(port?: number): void;
    getApiHandler(options?: {
        context?: Partial<Context>;
    }): Function;
    getQueueHandler(id: string, options?: {
        context?: Partial<Context>;
    }): (event: SQSEvent, context: Context, callback: Callback) => Promise<void>;
}
export {};
