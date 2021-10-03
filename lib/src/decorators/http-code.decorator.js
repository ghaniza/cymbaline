"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCode = void 0;
const HttpCode = (httpCode) => {
    return (target, propertyKey) => {
        if (Reflect.hasMetadata(propertyKey, target)) {
            const value = Reflect.getMetadata(propertyKey, target);
            Reflect.defineMetadata(propertyKey, { ...value, httpCode }, target);
        }
        else {
            const data = {
                propertyKey,
                httpCode,
            };
            Reflect.defineMetadata(propertyKey, data, target);
        }
    };
};
exports.HttpCode = HttpCode;
//# sourceMappingURL=http-code.decorator.js.map