"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CController = void 0;
const controller_decorator_1 = require("../../../src/decorators/controller.decorator");
const method_decorator_1 = require("../../../src/decorators/method.decorator");
const argument_decorator_1 = require("../../../src/decorators/argument.decorator");
const middleware_decorator_1 = require("../../../src/decorators/middleware.decorator");
const c_middleware_1 = require("../middlewares/c.middleware");
let CController = class CController {
    async getControllerMiddlewareA(value) {
        return value;
    }
    async getControllerMiddlewareB(value) {
        return value;
    }
};
__decorate([
    (0, method_decorator_1.Get)('/'),
    __param(0, (0, argument_decorator_1.Body)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CController.prototype, "getControllerMiddlewareA", null);
__decorate([
    (0, method_decorator_1.Post)('/'),
    __param(0, (0, argument_decorator_1.Body)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CController.prototype, "getControllerMiddlewareB", null);
CController = __decorate([
    (0, controller_decorator_1.Controller)('/controller-c'),
    (0, middleware_decorator_1.Middleware)(c_middleware_1.CMiddleware)
], CController);
exports.CController = CController;
//# sourceMappingURL=c.controller.js.map