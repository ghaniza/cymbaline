"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trace = exports.Head = exports.Options = exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = void 0;
const MethodDecorator = (method, path, httpCode) => {
    return (target, propertyKey, descriptor) => {
        const data = {
            propertyKey,
            method,
            path,
            httpCode,
            handler: descriptor.value,
            arguments: [],
            middlewares: [],
            headers: [],
        };
        if (Reflect.hasMetadata(propertyKey, target)) {
            const route = Reflect.getMetadata(propertyKey, target);
            Reflect.defineMetadata(propertyKey, { ...data, ...route }, target);
        }
        else {
            Reflect.defineMetadata(propertyKey, data, target);
        }
    };
};
const Get = (path, httpCode = 200) => MethodDecorator('get', path, httpCode);
exports.Get = Get;
const Post = (path, httpCode = 201) => MethodDecorator('post', path, httpCode);
exports.Post = Post;
const Put = (path, httpCode = 200) => MethodDecorator('put', path, httpCode);
exports.Put = Put;
const Patch = (path, httpCode = 200) => MethodDecorator('patch', path, httpCode);
exports.Patch = Patch;
const Delete = (path, httpCode = 200) => MethodDecorator('delete', path, httpCode);
exports.Delete = Delete;
const Options = (path, httpCode = 204) => MethodDecorator('options', path, httpCode);
exports.Options = Options;
const Head = (path, httpCode = 200) => MethodDecorator('head', path, httpCode);
exports.Head = Head;
const Trace = (path, httpCode = 200) => MethodDecorator('trace', path, httpCode);
exports.Trace = Trace;
//# sourceMappingURL=method.decorator.js.map