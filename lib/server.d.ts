import { RequestHandler } from "express";
import { Middleware } from "./middlewares";
declare type ServerConfigurationOptions = {
    dependencies: ((...args: any[]) => Promise<any> | any)[];
    middlewares: (RequestHandler | Middleware)[];
    controllers: Function[];
    queues: Function[];
};
export interface Logger {
    log: (level: 'debug' | 'info' | 'warn' | 'error', ...args: any[]) => void;
}
export interface ServerOptions {
    logger?: Logger;
}
export declare class Server {
    private readonly configuration;
    private app;
    private logger;
    private errorHandler;
    constructor(configuration: ServerConfigurationOptions, options?: ServerOptions);
    disable(setting: string): Promise<void>;
    set(setting: string, value: any): void;
    private configureDependencies;
    private configureControllers;
    init(): Promise<void>;
}
export {};
