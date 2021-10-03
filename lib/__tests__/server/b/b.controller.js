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
exports.BController = void 0;
const controller_decorator_1 = require("../../../src/decorators/controller.decorator");
const method_decorator_1 = require("../../../src/decorators/method.decorator");
const argument_decorator_1 = require("../../../src/decorators/argument.decorator");
const b_service_1 = require("./b.service");
let BController = class BController {
    bService;
    constructor(bService) {
        this.bService = bService;
    }
    async withService(queryString) {
        return this.bService.processedData(queryString);
    }
    helloFromAnotherController() {
        return { message: 'Hello from another controller!' };
    }
    withPutMethod() {
        return { message: 'Hello from PUT method' };
    }
    withPatchMethod() {
        return { message: 'Hello from PATCH method' };
    }
    withDeleteMethod() {
        return { message: 'Hello from DELETE method' };
    }
    withOptionsMethod() { }
    withHeadMethod() { }
    withTraceMethod() { }
};
__decorate([
    (0, method_decorator_1.Get)('/processed'),
    __param(0, (0, argument_decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BController.prototype, "withService", null);
__decorate([
    (0, method_decorator_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BController.prototype, "helloFromAnotherController", null);
__decorate([
    (0, method_decorator_1.Put)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BController.prototype, "withPutMethod", null);
__decorate([
    (0, method_decorator_1.Patch)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BController.prototype, "withPatchMethod", null);
__decorate([
    (0, method_decorator_1.Delete)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BController.prototype, "withDeleteMethod", null);
__decorate([
    (0, method_decorator_1.Options)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BController.prototype, "withOptionsMethod", null);
__decorate([
    (0, method_decorator_1.Head)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BController.prototype, "withHeadMethod", null);
__decorate([
    (0, method_decorator_1.Trace)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BController.prototype, "withTraceMethod", null);
BController = __decorate([
    (0, controller_decorator_1.Controller)('/other'),
    __metadata("design:paramtypes", [b_service_1.BService])
], BController);
exports.BController = BController;
//# sourceMappingURL=b.controller.js.map