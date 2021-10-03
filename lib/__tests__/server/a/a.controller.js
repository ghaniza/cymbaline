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
exports.AController = void 0;
const controller_decorator_1 = require("../../../src/decorators/controller.decorator");
const method_decorator_1 = require("../../../src/decorators/method.decorator");
const bad_request_exception_1 = require("../../../src/exceptions/bad-request.exception");
const argument_decorator_1 = require("../../../src/decorators/argument.decorator");
const a_service_1 = require("./a.service");
const a_middleware_1 = require("../middlewares/a.middleware");
const middleware_decorator_1 = require("../../../src/decorators/middleware.decorator");
const header_decorator_1 = require("../../../src/decorators/header.decorator");
const b_middleware_1 = require("../middlewares/b.middleware");
const http_code_decorator_1 = require("../../../src/decorators/http-code.decorator");
let AController = class AController {
    aService;
    constructor(aService) {
        this.aService = aService;
    }
    withService() {
        return this.aService.getHello();
    }
    withException() {
        throw new bad_request_exception_1.BadRequestException();
    }
    withRequestHandlerMiddleware() {
        return { message: 'Success' };
    }
    withCustomMiddleware() {
        return { message: 'Success' };
    }
    postEndpoint() {
        return { message: 'You just posted' };
    }
    parsedEndpoint(body, empty, param, query) {
        console.log({ body });
        return `This is the body: ${JSON.stringify(body)}, with "a" param: ${param} and query: ${JSON.stringify(query)}`;
    }
    getId(id) {
        return this.aService.displayMessage(id);
    }
};
__decorate([
    (0, method_decorator_1.Get)('/service'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AController.prototype, "withService", null);
__decorate([
    (0, method_decorator_1.Get)('/a'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AController.prototype, "withException", null);
__decorate([
    (0, method_decorator_1.Get)('/b'),
    (0, middleware_decorator_1.Middleware)(a_middleware_1.AMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AController.prototype, "withRequestHandlerMiddleware", null);
__decorate([
    (0, middleware_decorator_1.Middleware)(b_middleware_1.BMiddleware),
    (0, method_decorator_1.Get)('/c'),
    (0, http_code_decorator_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AController.prototype, "withCustomMiddleware", null);
__decorate([
    (0, method_decorator_1.Post)('/a'),
    (0, header_decorator_1.Header)('some-custom-header', 'some custom value'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AController.prototype, "postEndpoint", null);
__decorate([
    (0, http_code_decorator_1.HttpCode)(200),
    (0, method_decorator_1.Post)('/:a/parsed'),
    __param(0, (0, argument_decorator_1.Body)()),
    __param(2, (0, argument_decorator_1.Param)('a')),
    __param(3, (0, argument_decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", void 0)
], AController.prototype, "parsedEndpoint", null);
__decorate([
    (0, header_decorator_1.Header)('custom-header', 'custom value'),
    (0, method_decorator_1.Get)('/by-id/:id'),
    __param(0, (0, argument_decorator_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AController.prototype, "getId", null);
AController = __decorate([
    (0, controller_decorator_1.Controller)('/'),
    __metadata("design:paramtypes", [a_service_1.AService])
], AController);
exports.AController = AController;
//# sourceMappingURL=a.controller.js.map