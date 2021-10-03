import { CustomMiddleware, MiddlewareContext } from '../../../src/middlewares';
export declare class CMiddleware extends CustomMiddleware {
    configure(context: MiddlewareContext): Promise<void>;
}
