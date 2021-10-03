import { CustomMiddleware, MiddlewareContext } from '../../../src/middlewares'

export class BMiddleware extends CustomMiddleware {
    public async configure(context: MiddlewareContext) {
        if (context.response) context.response.setHeader('custom', 'injected by Middleware middleware')
    }
}
