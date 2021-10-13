"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Middleware = void 0;
var crypto_1 = require("crypto");
var MethodMiddleware = function (target, propertyKey, middleware) {
    var mws = Array.isArray(middleware) ? middleware : [middleware];
    if (Reflect.hasMetadata(propertyKey, target)) {
        var value = Reflect.getMetadata(propertyKey, target);
        var middlewares = Array.isArray(value === null || value === void 0 ? void 0 : value.middlewares) ? __spreadArray(__spreadArray([], value.middlewares, true), mws, true) : mws;
        Reflect.defineMetadata(propertyKey, __assign(__assign({}, value), { middlewares: middlewares }), target);
    }
    else {
        var data = {
            propertyKey: propertyKey,
            middlewares: mws
        };
        Reflect.defineMetadata(propertyKey, data, target);
    }
};
var ClassMiddleware = function (constructor, middleware) {
    var mws = Array.isArray(middleware) ? middleware : [middleware];
    if (!constructor.uid)
        constructor.uid = (0, crypto_1.randomUUID)();
    if (Reflect.hasMetadata(constructor.uid + ':middlewares', constructor.prototype, 'middlewares')) {
        var previous = Reflect.getMetadata(constructor.uid + ':middlewares', constructor.prototype, 'middlewares');
        Reflect.defineMetadata(constructor.uid + ':middlewares', __spreadArray(__spreadArray([], previous, true), mws, true), constructor.prototype, 'middlewares');
    }
    else {
        Reflect.defineMetadata(constructor.uid + ':middlewares', mws, constructor.prototype, 'middlewares');
    }
    return constructor;
};
var Middleware = function (middleware) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 3)
            return MethodMiddleware(args[0], args[1], middleware);
        return ClassMiddleware(args[0], middleware);
    };
};
exports.Middleware = Middleware;
