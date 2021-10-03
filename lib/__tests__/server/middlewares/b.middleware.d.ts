import { CustomMiddleware, MiddlewareContext } from '../../../src/middlewares';
export declare class BMiddleware extends CustomMiddleware {
    configure(context: MiddlewareContext): Promise<void>;
}
export declare class BQueueMiddleware extends CustomMiddleware {
    configure(context: MiddlewareContext): Promise<void>;
}
