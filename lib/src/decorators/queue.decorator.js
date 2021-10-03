"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const tsyringe_1 = require("tsyringe");
const crypto_1 = require("crypto");
const Queue = (id, options) => {
    return (constructor) => {
        let QueueClass = class QueueClass extends constructor {
            static uid = (0, crypto_1.randomUUID)();
            constructorName = constructor.name;
            queueId = id;
            middlewares = [];
            deleteOnSuccess = options?.deleteMessageOnSuccess ?? false;
        };
        QueueClass = __decorate([
            (0, tsyringe_1.injectable)()
        ], QueueClass);
        console.log('%s: %s', constructor.name, QueueClass.uid);
        return QueueClass;
    };
};
exports.Queue = Queue;
//# sourceMappingURL=queue.decorator.js.map