"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Att = exports.MsgAtt = exports.MD5OfBody = exports.EventSource = exports.MsgId = exports.ReceiptHandle = exports.Res = exports.Req = exports.Query = exports.Param = exports.Body = exports.ArgumentDecorator = void 0;
var ArgumentDecorator = function (payload) {
    return function (target, propertyKey, index) {
        if (Reflect.hasMetadata(propertyKey, target)) {
            var route = Reflect.getMetadata(propertyKey, target);
            route.arguments.splice(index, 1, __assign(__assign({}, payload), { propertyKey: propertyKey, index: index }));
            Reflect.defineMetadata(propertyKey, route, target);
        }
        else {
            var args = [];
            for (var i = 0; i < index + 1; i++) {
                if (i === index)
                    args.push(__assign(__assign({}, payload), { propertyKey: propertyKey, index: index }));
                else
                    args.push(undefined);
            }
            Reflect.defineMetadata(propertyKey, { arguments: args }, target);
        }
    };
};
exports.ArgumentDecorator = ArgumentDecorator;
var Body = function (key, options) {
    return (0, exports.ArgumentDecorator)({ type: 'body', key: key, parse: options === null || options === void 0 ? void 0 : options.parse });
};
exports.Body = Body;
var Param = function (key) { return (0, exports.ArgumentDecorator)({ type: 'param', key: key }); };
exports.Param = Param;
var Query = function (key) { return (0, exports.ArgumentDecorator)({ type: 'query', key: key }); };
exports.Query = Query;
var Req = function (options) {
    if (options === void 0) { options = { parsed: true }; }
    return (0, exports.ArgumentDecorator)({ type: 'req', parsed: options.parsed });
};
exports.Req = Req;
var Res = function (options) { return (0, exports.ArgumentDecorator)({ type: 'res', skip: options === null || options === void 0 ? void 0 : options.skipSend }); };
exports.Res = Res;
var ReceiptHandle = function () { return (0, exports.ArgumentDecorator)({ type: 'receiptHandler' }); };
exports.ReceiptHandle = ReceiptHandle;
var MsgId = function () { return (0, exports.ArgumentDecorator)({ type: 'messageId' }); };
exports.MsgId = MsgId;
var EventSource = function () { return (0, exports.ArgumentDecorator)({ type: 'eventSource' }); };
exports.EventSource = EventSource;
var MD5OfBody = function () { return (0, exports.ArgumentDecorator)({ type: 'md5OfBody' }); };
exports.MD5OfBody = MD5OfBody;
var MsgAtt = function () { return (0, exports.ArgumentDecorator)({ type: 'messageAttributes' }); };
exports.MsgAtt = MsgAtt;
var Att = function () { return (0, exports.ArgumentDecorator)({ type: 'attributes' }); };
exports.Att = Att;
