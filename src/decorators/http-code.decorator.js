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
exports.__esModule = true;
exports.HttpCode = void 0;
var HttpCode = function (httpCode) {
    return function (target, propertyKey) {
        if (Reflect.hasMetadata(propertyKey, target)) {
            var value = Reflect.getMetadata(propertyKey, target);
            Reflect.defineMetadata(propertyKey, __assign(__assign({}, value), { httpCode: httpCode }), target);
        }
        else {
            var data = {
                propertyKey: propertyKey,
                httpCode: httpCode
            };
            Reflect.defineMetadata(propertyKey, data, target);
        }
    };
};
exports.HttpCode = HttpCode;
