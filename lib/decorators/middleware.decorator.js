"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const Middleware = (middleware) => {
    return (target, propertyName, descriptor) => {
        if (!target.middlewares) {
            Object.defineProperty(target, 'middlewares', {
                configurable: true,
                get: () => {
                    if (!Array.isArray(middleware))
                        return [{ propertyName, middleware }];
                    return [{ propertyName, middleware: [middleware] }];
                },
                set: () => { },
            });
        }
        else {
            const middlewares = target.middlewares;
            Object.defineProperty(target, 'middlewares', {
                configurable: true,
                get: () => {
                    if (!Array.isArray(middleware))
                        return [...middlewares, { propertyName, middleware }];
                    return [...middlewares, { propertyName, middleware: [middleware] }];
                },
                set: () => { },
            });
        }
    };
};
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.decorator.js.map