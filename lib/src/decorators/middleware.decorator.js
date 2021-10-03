"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const crypto_1 = require("crypto");
const MethodMiddleware = (target, propertyKey, middleware) => {
    const mws = Array.isArray(middleware) ? middleware : [middleware];
    if (Reflect.hasMetadata(propertyKey, target)) {
        const value = Reflect.getMetadata(propertyKey, target);
        const middlewares = Array.isArray(value?.middlewares) ? [...value.middlewares, ...mws] : mws;
        Reflect.defineMetadata(propertyKey, { ...value, middlewares }, target);
    }
    else {
        const data = {
            propertyKey,
            middlewares: mws,
        };
        Reflect.defineMetadata(propertyKey, data, target);
    }
};
const ClassMiddleware = (constructor, middleware) => {
    const mws = Array.isArray(middleware) ? middleware : [middleware];
    if (Reflect.hasMetadata(constructor.uid + ':middlewares', constructor.prototype, 'middlewares')) {
        const previous = Reflect.getMetadata(constructor.uid + ':middlewares', constructor.prototype, 'middlewares');
        Reflect.defineMetadata(constructor.uid + ':middlewares', [...previous, ...mws], constructor.prototype, 'middlewares');
    }
    else {
        Reflect.defineMetadata(constructor.uid + ':middlewares', mws, constructor.prototype, 'middlewares');
    }
    constructor.uid = (0, crypto_1.randomUUID)();
    console.log({ name: constructor.name, uid: constructor.uid + ':middlewares' });
    return constructor;
};
const Middleware = (middleware) => {
    return (...args) => {
        if (args.length === 3)
            return MethodMiddleware(args[0], args[1], middleware);
        return ClassMiddleware(args[0], middleware);
    };
};
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.decorator.js.map