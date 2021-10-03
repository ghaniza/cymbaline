"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BQueueMiddleware = exports.BMiddleware = void 0;
const middlewares_1 = require("../../../src/middlewares");
class BMiddleware extends middlewares_1.CustomMiddleware {
    async configure(context) {
        if (context.response)
            context.response.setHeader('custom', 'injected by Middleware middleware');
    }
}
exports.BMiddleware = BMiddleware;
class BQueueMiddleware extends middlewares_1.CustomMiddleware {
    async configure(context) {
        console.log({ context: context?.record });
        if (context.record) {
            context.record.messageAttributes = {
                ...context.record.messageAttributes,
                'injected-value': {
                    stringValue: 'some random whatever',
                    dataType: 'String',
                },
            };
        }
    }
}
exports.BQueueMiddleware = BQueueMiddleware;
//# sourceMappingURL=b.middleware.js.map