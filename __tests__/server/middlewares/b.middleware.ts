import { CustomMiddleware, MiddlewareContext } from '../../../src/middlewares'

export class BMiddleware extends CustomMiddleware {
    public async configure(context: MiddlewareContext) {
        if (context.response) context.response.setHeader('custom', 'injected by Middleware middleware')
    }
}

export class BQueueMiddleware extends CustomMiddleware {
    async configure(context: MiddlewareContext): Promise<void> {
        if (context.record) {
            context.record.messageAttributes = {
                ...context.record.messageAttributes,
                'injected-value': {
                    stringValue: 'some random whatever',
                    dataType: 'String',
                },
            }
        }
    }
}
