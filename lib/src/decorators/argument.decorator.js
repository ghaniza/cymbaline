"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Att = exports.MsgAtt = exports.MD5OfBody = exports.EventSource = exports.MsgId = exports.ReceiptHandle = exports.Res = exports.Req = exports.Query = exports.Param = exports.Body = exports.ArgumentDecorator = void 0;
const ArgumentDecorator = (payload) => {
    return (target, propertyKey, index) => {
        if (Reflect.hasMetadata(propertyKey, target)) {
            const route = Reflect.getMetadata(propertyKey, target);
            route.arguments.splice(index, 1, payload);
            Reflect.defineMetadata(propertyKey, route, target);
        }
        else {
            const args = [];
            for (let i = 0; i < index + 1; i++) {
                if (i === index)
                    args.push(payload);
                else
                    args.push(undefined);
            }
            Reflect.defineMetadata(propertyKey, { arguments: args }, target);
        }
    };
};
exports.ArgumentDecorator = ArgumentDecorator;
const Body = (key, options) => (0, exports.ArgumentDecorator)({ type: 'body', key, parse: options?.parse });
exports.Body = Body;
const Param = (key) => (0, exports.ArgumentDecorator)({ type: 'param', key });
exports.Param = Param;
const Query = (key) => (0, exports.ArgumentDecorator)({ type: 'query', key });
exports.Query = Query;
const Req = (options = { parsed: true }) => (0, exports.ArgumentDecorator)({ type: 'req', parsed: options.parsed });
exports.Req = Req;
const Res = (options) => (0, exports.ArgumentDecorator)({ type: 'res', skip: options?.skipSend });
exports.Res = Res;
const ReceiptHandle = () => (0, exports.ArgumentDecorator)({ type: 'receiptHandler' });
exports.ReceiptHandle = ReceiptHandle;
const MsgId = () => (0, exports.ArgumentDecorator)({ type: 'messageId' });
exports.MsgId = MsgId;
const EventSource = () => (0, exports.ArgumentDecorator)({ type: 'eventSource' });
exports.EventSource = EventSource;
const MD5OfBody = () => (0, exports.ArgumentDecorator)({ type: 'md5OfBody' });
exports.MD5OfBody = MD5OfBody;
const MsgAtt = () => (0, exports.ArgumentDecorator)({ type: 'messageAttributes' });
exports.MsgAtt = MsgAtt;
const Att = () => (0, exports.ArgumentDecorator)({ type: 'attributes' });
exports.Att = Att;
//# sourceMappingURL=argument.decorator.js.map