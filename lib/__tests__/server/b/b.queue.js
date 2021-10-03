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
exports.BQueue = void 0;
const queue_decorator_1 = require("../../../src/decorators/queue.decorator");
const queue_handler_decorator_1 = require("../../../src/decorators/queue-handler.decorator");
const argument_decorator_1 = require("../../../src/decorators/argument.decorator");
const b_service_1 = require("./b.service");
const middleware_decorator_1 = require("../../../src/decorators/middleware.decorator");
const b_middleware_1 = require("../middlewares/b.middleware");
let BQueue = class BQueue {
    bService;
    constructor(bService) {
        this.bService = bService;
    }
    async handler(messageId, message, messageAttributes) {
        const value = messageAttributes['injected-value'];
        if (value)
            console.log('The injected value is: ' + value.stringValue);
        else
            console.log(await this.bService.sqsMessage(messageId, message));
    }
};
__decorate([
    (0, queue_handler_decorator_1.QueueHandler)(),
    __param(0, (0, argument_decorator_1.MsgId)()),
    __param(1, (0, argument_decorator_1.Body)('message')),
    __param(2, (0, argument_decorator_1.MsgAtt)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BQueue.prototype, "handler", null);
BQueue = __decorate([
    (0, middleware_decorator_1.Middleware)(b_middleware_1.BQueueMiddleware),
    (0, queue_decorator_1.Queue)('b-queue'),
    __metadata("design:paramtypes", [b_service_1.BService])
], BQueue);
exports.BQueue = BQueue;
//# sourceMappingURL=b.queue.js.map