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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Trace = exports.Head = exports.Options = exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var bad_request_exception_1 = require("../exceptions/bad-request.exception");
var MethodDecorator = function (method, path, httpCode) {
    return function (target, propertyKey, descriptor) {
        var paramTypes = Reflect.getOwnMetadata('design:paramtypes', target, propertyKey);
        var handler = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var response, errors;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(args.map(function (arg, index) { return __awaiter(_this, void 0, void 0, function () {
                                var value, errors;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(typeof arg === 'object')) return [3 /*break*/, 2];
                                            value = (0, class_transformer_1.plainToClass)(paramTypes[index], arg);
                                            return [4 /*yield*/, (0, class_validator_1.validate)(value)];
                                        case 1:
                                            errors = _a.sent();
                                            if (errors.length) {
                                                throw new bad_request_exception_1.BadRequestException('Validation Error', 'The following fields failed on validation: ' +
                                                    errors
                                                        .map(function (e) { return e.constraints; })
                                                        .reduce(function (p, c) { return p + Object.values(c).join(', '); }, ''));
                                            }
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, descriptor.value.apply(this, args)];
                        case 2:
                            response = _a.sent();
                            if (!(typeof response === 'object' && response.constructor.prototype !== global.Object)) return [3 /*break*/, 4];
                            return [4 /*yield*/, (0, class_validator_1.validate)(response)];
                        case 3:
                            errors = _a.sent();
                            if (errors.length)
                                throw new bad_request_exception_1.BadRequestException('Validation Error', 'The following fields failed on validation: ' +
                                    errors.map(function (e) { return e.constraints; }).reduce(function (p, c) { return p + Object.values(c).join(', '); }, ''));
                            return [2 /*return*/, (0, class_transformer_1.classToPlain)(response)];
                        case 4: return [2 /*return*/, response];
                    }
                });
            });
        };
        var data = {
            propertyKey: propertyKey,
            method: method,
            path: path,
            httpCode: httpCode,
            handler: handler,
            arguments: [],
            middlewares: [],
            headers: []
        };
        if (Reflect.hasMetadata(propertyKey, target)) {
            var route = Reflect.getMetadata(propertyKey, target);
            Reflect.defineMetadata(propertyKey, __assign(__assign({}, data), route), target);
        }
        else {
            Reflect.defineMetadata(propertyKey, data, target);
        }
    };
};
var Get = function (path, httpCode) {
    if (httpCode === void 0) { httpCode = 200; }
    return MethodDecorator('get', path, httpCode);
};
exports.Get = Get;
var Post = function (path, httpCode) {
    if (httpCode === void 0) { httpCode = 201; }
    return MethodDecorator('post', path, httpCode);
};
exports.Post = Post;
var Put = function (path, httpCode) {
    if (httpCode === void 0) { httpCode = 200; }
    return MethodDecorator('put', path, httpCode);
};
exports.Put = Put;
var Patch = function (path, httpCode) {
    if (httpCode === void 0) { httpCode = 200; }
    return MethodDecorator('patch', path, httpCode);
};
exports.Patch = Patch;
var Delete = function (path, httpCode) {
    if (httpCode === void 0) { httpCode = 200; }
    return MethodDecorator('delete', path, httpCode);
};
exports.Delete = Delete;
var Options = function (path, httpCode) {
    if (httpCode === void 0) { httpCode = 204; }
    return MethodDecorator('options', path, httpCode);
};
exports.Options = Options;
var Head = function (path, httpCode) {
    if (httpCode === void 0) { httpCode = 200; }
    return MethodDecorator('head', path, httpCode);
};
exports.Head = Head;
var Trace = function (path, httpCode) {
    if (httpCode === void 0) { httpCode = 200; }
    return MethodDecorator('trace', path, httpCode);
};
exports.Trace = Trace;
