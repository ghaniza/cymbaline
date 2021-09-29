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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const tsyringe_1 = require("tsyringe");
const express_1 = __importStar(require("express"));
const logger_1 = require("./utils/logger");
const http_exception_1 = require("./exceptions/http.exception");
class Server {
    constructor(configuration, options) {
        this.configuration = configuration;
        this.logger = new logger_1.DefaultLogger();
        this.errorHandler = http_exception_1.HTTPException.handler;
        this.app = (0, express_1.default)();
        this.app.use(this.errorHandler);
        if (options) {
            if (options === null || options === void 0 ? void 0 : options.logger) {
                this.logger = options.logger;
            }
        }
    }
    async disable(setting) {
        this.app.disable(setting);
    }
    set(setting, value) {
        this.app.set(setting, value);
    }
    async configureDependencies() {
        await Promise.all(this.configuration.dependencies.map(async (d) => await d()));
    }
    configureControllers() {
        const controllers = this.configuration.controllers.map(c => tsyringe_1.container.resolve(c));
        controllers.forEach(controller => {
            this.logger.log('info', `Controller ${Object.getPrototypeOf(controller).name}: Mapped to "${controller.path}"`);
            const router = (0, express_1.Router)();
            controller.router.forEach(route => {
                if (controller.path === '/')
                    controller.path = "";
                router[route.method](controller.path + route.path, async (req, res, next) => {
                    try {
                        const response = await route.handler.bind(controller)();
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
    async init() {
        await this.configureDependencies();
        this.configureControllers();
        this.app.listen(3000);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map