"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMiddleware = void 0;
const middlewares_1 = require("../../../src/middlewares");
class CMiddleware extends middlewares_1.CustomMiddleware {
    async configure(context) {
        if (context.request && context.response) {
            const value = context.request.header('custom-controller-header');
            context.request.body = {
                value,
            };
        }
    }
}
exports.CMiddleware = CMiddleware;
//# sourceMappingURL=c.middleware.js.map