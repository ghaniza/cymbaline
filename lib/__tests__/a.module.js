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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("../index"));
const method_decorator_1 = require("../decorators/method.decorator");
const controller_decorator_1 = require("../decorators/controller.decorator");
const bad_request_exception_1 = require("../exceptions/bad-request.exception");
let Service = class Service {
    getHello() {
        return 'hello world!';
    }
};
Service = __decorate([
    (0, index_1.Injectable)()
], Service);
class Database {
    static configure() {
        return async () => new Promise((res, rej) => {
            setTimeout(() => {
                console.log('finished');
                res(null);
            }, 5000);
        });
    }
}
let MyController = class MyController {
    constructor(service) {
        this.service = service;
    }
    hello() {
        return this.service.getHello();
    }
    test() {
        throw new bad_request_exception_1.BadRequestException();
    }
    root() {
        return 'hello from root';
    }
    world() {
        return 'b';
    }
};
__decorate([
    (0, method_decorator_1.Get)('/a'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyController.prototype, "hello", null);
__decorate([
    (0, method_decorator_1.Get)('/b'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyController.prototype, "test", null);
__decorate([
    (0, method_decorator_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyController.prototype, "root", null);
__decorate([
    (0, method_decorator_1.Post)('/b'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyController.prototype, "world", null);
MyController = __decorate([
    (0, controller_decorator_1.Controller)('/'),
    __metadata("design:paramtypes", [Service])
], MyController);
const server = new index_1.default({
    dependencies: [Database.configure()],
    controllers: [MyController],
    queues: [],
    middlewares: []
});
server.init();
//# sourceMappingURL=a.module.js.map