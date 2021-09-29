"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = exports.Options = exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = void 0;
const MethodDecorator = (method, path, httpCode) => {
    return (target, propertyName, descriptor) => {
        if (!(target === null || target === void 0 ? void 0 : target.router))
            Object.defineProperty(target, 'router', {
                configurable: true,
                get: () => {
                    return [{
                            propertyName,
                            method,
                            path,
                            httpCode,
                            handler: descriptor.value
                        }];
                },
            });
        else {
            const routes = target.router;
            Object.defineProperty(target, 'router', {
                configurable: true,
                get: () => {
                    return [
                        ...routes,
                        {
                            propertyName,
                            method,
                            path,
                            httpCode,
                            handler: descriptor.value
                        }
                    ];
                },
            });
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
//# sourceMappingURL=method.decorator.js.map