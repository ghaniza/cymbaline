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
exports.QueueHandler = void 0;
var QueueHandler = function () {
    return function (target, propertyKey, descriptor) {
        if (Reflect.hasMetadata(propertyKey, target)) {
            var queue = Reflect.getMetadata(propertyKey, target);
            Reflect.defineMetadata(propertyKey, __assign(__assign({}, queue), { handler: descriptor.value }), target);
        }
        else {
            Reflect.defineMetadata('handler', { handler: descriptor.value }, target);
        }
    };
};
exports.QueueHandler = QueueHandler;
