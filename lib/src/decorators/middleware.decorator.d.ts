import { RequestHandler } from 'express';
import { CustomMiddleware } from '../middlewares';
export declare const Middleware: (middleware: RequestHandler | RequestHandler[] | {
    new (): CustomMiddleware;
} | {
    new (): CustomMiddleware;
}[]) => (...args: any[]) => any;
