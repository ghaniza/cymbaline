"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var create_api_event_1 = require("../src/utils/create-api-event");
var server_1 = require("./server");
var crypto_1 = require("crypto");
describe('Server - SQS', function () {
    var consoleSpy;
    beforeAll(function () {
        delete process.env.DEBUG;
        consoleSpy = jest.spyOn(global.console, 'log');
    });
    beforeEach(function () {
        consoleSpy.mockReset();
    });
    it('Should get response with parsed body - JSON', function () { return __awaiter(void 0, void 0, void 0, function () {
        var record, event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    record = {
                        body: JSON.stringify({ a: 47 }),
                        messageAttributes: {
                            'Content-Type': {
                                stringValue: 'application/json',
                                dataType: 'String'
                            }
                        }
                    };
                    event = (0, create_api_event_1.createSQSEvent)([record]);
                    return [4 /*yield*/, server_1["default"].aQueue(event, null, function () { })];
                case 1:
                    _a.sent();
                    expect(consoleSpy).toHaveBeenCalledWith('The body is: ' + record.body);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get response with parsed body - URL encoded', function () { return __awaiter(void 0, void 0, void 0, function () {
        var record, event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    record = {
                        body: 'a=47&b=hello',
                        messageAttributes: {
                            'Content-Type': {
                                stringValue: 'application/x-www-form-urlencoded',
                                dataType: 'String'
                            }
                        }
                    };
                    event = (0, create_api_event_1.createSQSEvent)([record]);
                    return [4 /*yield*/, server_1["default"].aQueue(event, null, function () { })];
                case 1:
                    _a.sent();
                    expect(consoleSpy).toHaveBeenCalledWith('The body is: {"a":"47","b":"hello"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get response with injected middleware', function () { return __awaiter(void 0, void 0, void 0, function () {
        var record, event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    record = {
                        body: 'a=47&b=hello',
                        messageAttributes: {
                            'Content-Type': {
                                stringValue: 'application/x-www-form-urlencoded',
                                dataType: 'String'
                            }
                        }
                    };
                    event = (0, create_api_event_1.createSQSEvent)([record]);
                    return [4 /*yield*/, server_1["default"].bQueue(event, null, function () { })];
                case 1:
                    _a.sent();
                    expect(consoleSpy).toHaveBeenCalledWith('The injected value is: some random whatever');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get response without parsed body', function () { return __awaiter(void 0, void 0, void 0, function () {
        var record, event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    record = {
                        body: 'some body'
                    };
                    event = (0, create_api_event_1.createSQSEvent)([record]);
                    return [4 /*yield*/, server_1["default"].aQueue(event, null, function () { })];
                case 1:
                    _a.sent();
                    expect(consoleSpy).toHaveBeenCalledWith('The body is: ' + JSON.stringify(record.body));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get messageId', function () { return __awaiter(void 0, void 0, void 0, function () {
        var record, event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    record = {
                        body: JSON.stringify({ message: 'Hello World!' }),
                        messageId: (0, crypto_1.randomUUID)(),
                        messageAttributes: {
                            'Content-Type': {
                                stringValue: 'application/json',
                                dataType: 'String'
                            }
                        }
                    };
                    event = (0, create_api_event_1.createSQSEvent)([record]);
                    return [4 /*yield*/, server_1["default"].bQueue(event, null, function () { })];
                case 1:
                    _a.sent();
                    expect(consoleSpy).toHaveBeenCalledWith("[" + record.messageId + "] The message is: Hello World!");
                    return [2 /*return*/];
            }
        });
    }); });
});
