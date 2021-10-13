import { CustomMiddleware, MiddlewareContext } from '../../../src/middlewares'

export class CMiddleware extends CustomMiddleware {
    public async configure(context: MiddlewareContext) {
        if (context.request && context.response) {
            const value = context.request.header('custom-controller-header')
            context.request.body = {
                value,
            }
        }
    }
}
