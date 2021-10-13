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
exports.Server = void 0;
var tsyringe_1 = require("tsyringe");
var express_1 = require("express");
var middlewares_1 = require("./middlewares");
var logger_1 = require("./utils/logger");
var http_exception_1 = require("./exceptions/http.exception");
var serverless_http_1 = require("serverless-http");
var qs_1 = require("qs");
var path_1 = require("path");
var fs_1 = require("fs");
var serverless_1 = require("./utils/serverless");
var Server = /** @class */ (function () {
    function Server(configuration, options) {
        this.configuration = configuration;
        this.logger = new logger_1.DefaultLogger();
        this.errorHandler = http_exception_1.HTTPException.handler;
        this.metadataDir = path_1["default"].resolve('.cymbaline');
        this.app = (0, express_1["default"])();
        this.loadGlobalMiddlewares();
        if (options) {
            if (options === null || options === void 0 ? void 0 : options.logger) {
                this.logger = options.logger;
            }
            if (options === null || options === void 0 ? void 0 : options.errorHandler) {
                this.errorHandler = options.errorHandler;
            }
        }
    }
    Server.prototype.disable = function (setting) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.app.disable(setting);
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.set = function (setting, value) {
        this.app.set(setting, value);
    };
    Server.prototype.loadGlobalMiddlewares = function () {
        var _this = this;
        this.configuration.middlewares.forEach(function (middleware) {
            if (middleware.prototype instanceof middlewares_1.CustomMiddleware) {
                var mw_1 = tsyringe_1.container.resolve(middleware);
                _this.app.use(function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, mw_1.configure.bind(mw_1)({
                                    request: request,
                                    response: response
                                })];
                            case 1:
                                _a.sent();
                                next();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            else {
                _this.app.use(middleware);
            }
        });
    };
    Server.prototype.configureDependencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.configuration.dependencies.map(function (d) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, d()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.getArgumentsByType = function (args, req, res) {
        return args.map(function (arg) {
            if (!arg)
                return undefined;
            switch (arg.type) {
                case 'body':
                    return arg.key ? req.body[arg.key] : req.body;
                case 'param':
                    return arg.key ? req.params[arg.key] : req.params;
                case 'query':
                    return arg.key ? req.query[arg.key] : req.query;
                case 'req':
                    return req;
                case 'res':
                    return res;
                default:
                    return undefined;
            }
        });
    };
    Server.prototype.getArgumentsByEvent = function (args, record) {
        return args.map(function (arg) {
            if (!arg)
                return undefined;
            if (arg.type === 'body') {
                if (record === null || record === void 0 ? void 0 : record.messageAttributes) {
                    var name_1 = Object.keys(record.messageAttributes).find(function (k) { return k.toLowerCase() === 'content-type'; });
                    if (!name_1)
                        return record.body;
                    var contentType = record.messageAttributes[name_1];
                    if (contentType.dataType === 'String') {
                        var value = contentType.stringValue;
                        if (value.includes('application/json')) {
                            if (arg.key)
                                return JSON.parse(record.body)[arg.key];
                            return JSON.parse(record.body);
                        }
                        else if (value.includes('application/x-www-form-urlencoded')) {
                            if (arg.key)
                                return qs_1["default"].parse(record.body)[arg.key];
                            return qs_1["default"].parse(record.body);
                        }
                    }
                }
                return record.body;
            }
            return record[arg.type];
        });
    };
    Server.prototype.configureControllers = function () {
        var _this = this;
        var controllers = this.configuration.controllers.map(function (c) { return ({
            instance: tsyringe_1.container.resolve(c),
            cls: c
        }); });
        controllers.forEach(function (_a) {
            var _b;
            var instance = _a.instance, cls = _a.cls;
            _this.logger.log('info', "[server] Controller " + instance.controllerName + ": Mapped to \"" + instance.path + "\"");
            var router = (0, express_1.Router)();
            var controllerMiddlewares = (_b = Reflect.getMetadata(cls.uid + ':middlewares', instance, 'middlewares')) !== null && _b !== void 0 ? _b : [];
            var middlewares = [];
            if (controllerMiddlewares === null || controllerMiddlewares === void 0 ? void 0 : controllerMiddlewares.length) {
                controllerMiddlewares.forEach(function (middleware) {
                    var mw = middleware;
                    if (middleware.prototype instanceof middlewares_1.CustomMiddleware) {
                        var instance_1 = tsyringe_1.container.resolve(middleware);
                        mw = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, instance_1.configure.bind(instance_1)({
                                            request: req,
                                            response: res
                                        })];
                                    case 1:
                                        _a.sent();
                                        next();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                    }
                    middlewares.push(mw);
                });
            }
            Reflect.getMetadataKeys(instance).forEach(function (key) {
                var _a;
                var route = Reflect.getMetadata(key, instance);
                if (instance.path === '/')
                    instance.path = '';
                var localMiddlewares = [];
                if ((_a = route.middlewares) === null || _a === void 0 ? void 0 : _a.length)
                    localMiddlewares = route.middlewares.map(function (middleware) {
                        if (middleware.prototype instanceof middlewares_1.CustomMiddleware) {
                            var mw_2 = tsyringe_1.container.resolve(middleware);
                            return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, mw_2.configure.bind(mw_2)({ request: req, response: res })];
                                        case 1:
                                            _a.sent();
                                            next();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                        }
                        return middleware;
                    });
                router[route.method](instance.path + route.path, __spreadArray(__spreadArray([], middlewares, true), localMiddlewares, true), function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                    var args, response, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                route.headers.forEach(function (_a) {
                                    var header = _a[0], value = _a[1];
                                    res.setHeader(header, value);
                                });
                                args = this.getArgumentsByType(route.arguments, req, res);
                                return [4 /*yield*/, route.handler.apply(instance, args)];
                            case 1:
                                response = _a.sent();
                                if (route.arguments.find(function (a) { return a && (a === null || a === void 0 ? void 0 : a.type) === 'res' && (a === null || a === void 0 ? void 0 : a.skip); }))
                                    return [2 /*return*/, next()];
                                return [2 /*return*/, res.status(route.httpCode).send(response)];
                            case 2:
                                e_1 = _a.sent();
                                next(e_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
            });
            _this.app.use(router);
        });
    };
    Server.prototype.initHttp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app.use(function (req, res, next) {
                            req.timestamp = Date.now();
                            var showLog = function () {
                                var host = req.hostname;
                                var user = req.user;
                                var duration = Date.now() - req.timestamp;
                                var method = req.method.toUpperCase();
                                var bytes = res.getHeader('content-length');
                                var status = res.statusCode;
                                var path = req.path;
                                var protocol = req.protocol.toUpperCase() + req.httpVersion;
                                var level;
                                switch (true) {
                                    case status >= 400 && status < 500:
                                        level = 'warn';
                                        break;
                                    case status >= 500:
                                        level = 'error';
                                        break;
                                    default:
                                        level = 'info';
                                        break;
                                }
                                var log = "[server] " + host + " " + (user !== null && user !== void 0 ? user : '-') + " [" + new Date(req.timestamp).toUTCString() + "] \"" + method + " " + path + " " + protocol + "\" " + status + " " + (bytes !== null && bytes !== void 0 ? bytes : 0) + " -- " + duration + "ms";
                                _this.logger.log(level, log);
                                if (!res.headersSent)
                                    next();
                            };
                            req.on('end', showLog);
                            res.on('finish', showLog);
                            next();
                        });
                        return [4 /*yield*/, this.configureDependencies()];
                    case 1:
                        _a.sent();
                        this.configureControllers();
                        this.app.use(function (e, req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (this.errorHandler)
                                    return [2 /*return*/, this.errorHandler(e, req, res, this.logger)];
                                return [2 /*return*/, next()];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.initSQS = function (queueId, event) {
        var _this = this;
        var queue;
        var QueueClass;
        this.configuration.queues.forEach(function (q) {
            if (queue)
                return;
            var instance = tsyringe_1.container.resolve(q);
            if (q.queueId === queueId) {
                queue = instance;
                QueueClass = q;
            }
        });
        if (!queue)
            throw new Error("Queue not found: \"" + queueId + "\"");
        var queueHandler = Reflect.getMetadata('handler', queue);
        var middlewares = [];
        this.configuration.middlewares.forEach(function (mw) {
            if (mw.prototype instanceof middlewares_1.CustomMiddleware) {
                var middleware = tsyringe_1.container.resolve(mw);
                middlewares.push(middleware.configure.bind(middleware));
            }
        });
        var queueMiddlewares = Reflect.getMetadata(QueueClass.uid + ':middlewares', queue, 'middlewares');
        if (queueMiddlewares === null || queueMiddlewares === void 0 ? void 0 : queueMiddlewares.length) {
            queueMiddlewares.forEach(function (mw) {
                if (mw.prototype instanceof middlewares_1.CustomMiddleware) {
                    var middleware = tsyringe_1.container.resolve(mw);
                    middlewares.push(middleware.configure.bind(middleware));
                }
            });
        }
        return Promise.all(event.Records.map(function (record) { return __awaiter(_this, void 0, void 0, function () {
            var args;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(middlewares.map(function (mw) {
                            return mw({ record: record });
                        }))["catch"](function (e) {
                            _this.logger.log('error', e.message);
                        })];
                    case 1:
                        _a.sent();
                        args = this.getArgumentsByEvent(queueHandler.arguments, record);
                        return [4 /*yield*/, queueHandler.handler.bind(queue).apply(void 0, args)];
                    case 2:
                        _a.sent();
                        queue.deleteMessageOnSuccess(record.receiptHandle);
                        return [2 /*return*/];
                }
            });
        }); }));
    };
    Server.prototype.startServer = function (port) {
        var _this = this;
        this.initHttp().then(function () {
            _this.app.listen(port, function () {
                _this.logger.log('info', '[server] Listening to port ' + port);
            });
        });
    };
    Server.prototype.getApiHandler = function (options) {
        var _this = this;
        return (0, serverless_http_1["default"])(this.app, {
            request: function (req, event, context) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (options && options.context) {
                                context = __assign(__assign({}, context), options.context);
                            }
                            return [4 /*yield*/, this.initHttp()];
                        case 1:
                            _a.sent();
                            req.event = event;
                            req.context = context;
                            return [2 /*return*/];
                    }
                });
            }); }
        });
    };
    Server.prototype.getQueueHandler = function (id, options) {
        var _this = this;
        return function (event, context, callback) { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (options && options.context)
                            context = __assign(__assign({}, context), options.context);
                        return [4 /*yield*/, this.initSQS(id, event)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, callback(e_2)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    };
    Server.prototype.exportHandlers = function (options) {
        var _this = this;
        if (!fs_1["default"].existsSync(this.metadataDir))
            fs_1["default"].mkdirSync(this.metadataDir);
        var exports = {};
        var serverless = new serverless_1.Serverless();
        if (this.configuration.controllers.length) {
            exports.apiHandler = this.getApiHandler(options);
            serverless.addFunction('apiHandler', {
                handler: 'dist/index.apiHandler',
                memorySize: 1024,
                timeout: 6,
                events: {
                    http: 'ANY /{proxy+}'
                }
            });
        }
        if (this.configuration.queues.length) {
            this.configuration.queues.forEach(function (queue) {
                var name = queue.queueId;
                var q = tsyringe_1.container.resolve(queue);
                exports[name] = _this.getQueueHandler(name);
                if (!q.queueARN)
                    _this.logger.log('warn', "[server] The \"" + name + "\" queue does not have a valid ARN, current value is: " + q.queueARN);
                else
                    serverless.addFunction(name, {
                        handler: 'dist/index.' + name,
                        memorySize: 1024,
                        timeout: 6,
                        events: {
                            sqs: q.queueARN
                        }
                    });
            });
        }
        serverless.saveMetadata(this.metadataDir);
        this.logger.log('info', '[server] Server metadata updated');
        return exports;
    };
    return Server;
}());
exports.Server = Server;
