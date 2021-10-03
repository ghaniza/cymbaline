"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueHandler = void 0;
const QueueHandler = () => {
    return (target, propertyKey, descriptor) => {
        if (Reflect.hasMetadata(propertyKey, target)) {
            const queue = Reflect.getMetadata(propertyKey, target);
            Reflect.defineMetadata(propertyKey, { ...queue, handler: descriptor.value }, target);
        }
        else {
            Reflect.defineMetadata('handler', { handler: descriptor.value }, target);
        }
    };
};
exports.QueueHandler = QueueHandler;
//# sourceMappingURL=queue-handler.decorator.js.map