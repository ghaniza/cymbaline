"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const tsyringe_1 = require("tsyringe");
const express_1 = __importStar(require("express"));
const middlewares_1 = require("./middlewares");
const logger_1 = require("./utils/logger");
const http_exception_1 = require("./exceptions/http.exception");
const serverless_http_1 = __importDefault(require("serverless-http"));
const qs_1 = __importDefault(require("qs"));
class Server {
    configuration;
    app;
    logger = new logger_1.DefaultLogger();
    errorHandler = http_exception_1.HTTPException.handler;
    constructor(configuration, options) {
        this.configuration = configuration;
        this.app = (0, express_1.default)();
        this.loadGlobalMiddlewares();
        if (options) {
            if (options?.logger) {
                this.logger = options.logger;
            }
            if (options?.errorHandler) {
                this.errorHandler = options.errorHandler;
            }
        }
    }
    async disable(setting) {
        this.app.disable(setting);
    }
    set(setting, value) {
        this.app.set(setting, value);
    }
    loadGlobalMiddlewares() {
        this.configuration.middlewares.forEach((middleware) => {
            if (middleware.prototype instanceof middlewares_1.CustomMiddleware) {
                const mw = tsyringe_1.container.resolve(middleware);
                this.app.use(async (request, response, next) => {
                    await mw.configure.bind(mw)({
                        request,
                        response,
                    });
                    next();
                });
            }
            else {
                this.app.use(middleware);
            }
        });
    }
    async configureDependencies() {
        await Promise.all(this.configuration.dependencies.map(async (d) => await d()));
    }
    getArgumentsByType(args, req, res) {
        return args.map((arg) => {
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
    }
    getArgumentsByEvent(args, record) {
        return args.map((arg) => {
            if (!arg)
                return undefined;
            if (arg.type === 'body') {
                if (record?.messageAttributes) {
                    const name = Object.keys(record.messageAttributes).find((k) => k.toLowerCase() === 'content-type');
                    if (!name)
                        return record.body;
                    const contentType = record.messageAttributes[name];
                    if (contentType.dataType === 'String') {
                        const value = contentType.stringValue;
                        if (value.includes('application/json')) {
                            if (arg.key)
                                return JSON.parse(record.body)[arg.key];
                            return JSON.parse(record.body);
                        }
                        else if (value.includes('application/x-www-form-urlencoded')) {
                            if (arg.key)
                                return qs_1.default.parse(record.body)[arg.key];
                            return qs_1.default.parse(record.body);
                        }
                    }
                }
                return record.body;
            }
            return record[arg.type];
        });
    }
    configureControllers() {
        const controllers = this.configuration.controllers.map((c) => ({
            instance: tsyringe_1.container.resolve(c),
            cls: c,
        }));
        controllers.forEach(({ instance, cls }) => {
            this.logger.log('info', `[server] Controller ${instance.controllerName}: Mapped to "${instance.path}"`);
            const router = (0, express_1.Router)();
            const controllerMiddlewares = Reflect.getMetadata(cls.uid + ':middlewares', cls, 'middlewares') ?? [];
            const middlewares = [];
            console.log(instance.controllerName, cls.uid + ':middlewares', controllerMiddlewares);
            if (controllerMiddlewares?.length) {
                controllerMiddlewares.forEach((middleware) => {
                    let mw = middleware;
                    if (middleware.prototype instanceof middlewares_1.CustomMiddleware) {
                        const instance = tsyringe_1.container.resolve(middleware);
                        mw = async (req, res, next) => {
                            await instance.configure.bind(instance)({
                                request: req,
                                response: res,
                            });
                            next();
                        };
                    }
                    middlewares.push(mw);
                });
            }
            Reflect.getMetadataKeys(instance).forEach((key) => {
                const route = Reflect.getMetadata(key, instance);
                if (instance.path === '/')
                    instance.path = '';
                let localMiddlewares = [];
                if (route.middlewares?.length)
                    localMiddlewares = route.middlewares.map((middleware) => {
                        if (middleware.prototype instanceof middlewares_1.CustomMiddleware) {
                            const mw = tsyringe_1.container.resolve(middleware);
                            return async (req, res, next) => {
                                await mw.configure.bind(mw)({ request: req, response: res });
                                next();
                            };
                        }
                        return middleware;
                    });
                router[route.method](instance.path + route.path, [...middlewares, ...localMiddlewares], async (req, res, next) => {
                    try {
                        route.headers.forEach(([header, value]) => {
                            res.setHeader(header, value);
                        });
                        const args = this.getArgumentsByType(route.arguments, req, res);
                        const response = await route.handler.bind(instance)(...args);
                        if (route.arguments.find((a) => a && a?.type === 'res' && a?.skip))
                            return next();
                        return res.status(route.httpCode).send(response);
                    }
                    catch (e) {
                        next(e);
                    }
                });
            });
            this.app.use(router);
        });
    }
    async initHttp() {
        this.app.use((req, res, next) => {
            req.timestamp = Date.now();
            const showLog = () => {
                const host = req.hostname;
                const user = req.user;
                const duration = Date.now() - req.timestamp;
                const method = req.method.toUpperCase();
                const bytes = res.getHeader('content-length');
                const status = res.statusCode;
                const path = req.path;
                const protocol = req.protocol.toUpperCase() + req.httpVersion;
                let level;
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
                const log = `[server] ${host} ${user ?? '-'} [${new Date(req.timestamp).toUTCString()}] "${method} ${path} ${protocol}" ${status} ${bytes ?? 0} -- ${duration}ms`;
                this.logger.log(level, log);
                if (!res.headersSent)
                    next();
            };
            req.on('end', showLog);
            res.on('finish', showLog);
            next();
        });
        await this.configureDependencies();
        this.configureControllers();
        this.app.use(async (e, req, res, next) => {
            if (this.errorHandler)
                return this.errorHandler(e, req, res, this.logger);
            return next();
        });
    }
    initSQS(queueId, event) {
        let queue;
        let QueueClass;
        this.configuration.queues.forEach((q) => {
            if (queue)
                return;
            const instance = tsyringe_1.container.resolve(q);
            if (instance.queueId === queueId) {
                queue = instance;
                QueueClass = q;
            }
        });
        if (!queue)
            throw new Error(`Queue not found: "${queueId}"`);
        const queueHandler = Reflect.getMetadata('handler', queue);
        const middlewares = [];
        this.configuration.middlewares.forEach((mw) => {
            if (mw instanceof middlewares_1.CustomMiddleware) {
                const middleware = tsyringe_1.container.resolve(mw);
                middlewares.push(middleware.configure.bind(middleware));
            }
        });
        const queueMiddlewares = Reflect.getMetadata(QueueClass.uid + ':middlewares', queue, 'middlewares');
        if (queueMiddlewares?.length) {
            queueMiddlewares.forEach((mw) => {
                if (mw instanceof middlewares_1.CustomMiddleware) {
                    const middleware = tsyringe_1.container.resolve(mw);
                    middlewares.push(middleware.configure.bind(middleware));
                }
            });
        }
        return Promise.all(event.Records.map(async (record) => {
            await Promise.all(middlewares.map((mw) => {
                return mw({ record });
            })).catch((e) => {
                this.logger.log('error', e.message);
            });
            console.log({ middlewares });
            const args = this.getArgumentsByEvent(queueHandler.arguments, record);
            return queueHandler.handler.bind(queue)(...args);
        }));
    }
    startServer(port) {
        this.initHttp().then(() => {
            this.app.listen(port, () => {
                this.logger.log('info', '[server] Listening to port ' + port);
            });
        });
    }
    getApiHandler(options) {
        return (0, serverless_http_1.default)(this.app, {
            request: async (req, event, context) => {
                if (options && options.context) {
                    context = { ...context, ...options.context };
                }
                await this.initHttp();
                req.event = event;
                req.context = context;
            },
        });
    }
    getQueueHandler(id, options) {
        return async (event, context, callback) => {
            try {
                if (options && options.context)
                    context = { ...context, ...options.context };
                await this.initSQS(id, event);
            }
            catch (e) {
                return callback(e);
            }
        };
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map