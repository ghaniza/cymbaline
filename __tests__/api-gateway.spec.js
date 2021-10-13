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
var server_1 = require("./server");
var create_api_event_1 = require("../src/utils/create-api-event");
describe('Server - API Gateway', function () {
    beforeAll(function () {
        // delete process.env.DEBUG
    });
    it('Should get a route with injected class', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/service', method: 'GET' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('text')).toBeTruthy();
                    expect(response.body).toEqual('Hello World!');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get a route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/a', method: 'GET' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(400);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.body).toEqual(JSON.stringify({ error: 'Bad Request' }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should post to a route', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/a', method: 'POST' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(201);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.body).toEqual(JSON.stringify({ message: 'You just posted' }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should not post upon a invalid body', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/a-error', method: 'POST' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(400);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.body).toEqual('{"error":"Validation Error","error_description":"The following fields failed on validation: message must be a string"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should have a custom header', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/by-id/123456', method: 'GET' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('text/html')).toBeTruthy();
                    expect(response.headers['custom-header']).toEqual('custom value');
                    expect(response.body).toEqual('The ID is 123456');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get a parsed value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var queryString, body, headers, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryString = { token: 'supersecret' };
                    body = JSON.stringify({ a: 1, b: '2' });
                    headers = { 'Content-Type': 'application/json' };
                    return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/abc123/parsed', method: 'POST', queryString: queryString, body: body, headers: headers }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('text/html')).toBeTruthy();
                    expect(response.body).toEqual("This is the body: " + body + ", with \"a\" param: abc123 and query: " + JSON.stringify({
                        token: 'supersecret'
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should not get a parsed value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var queryString, body, headers, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryString = { token: 'ultra this time => supersecret' };
                    body = JSON.stringify({ a: '1', b: '2' });
                    headers = { 'Content-Type': 'application/json' };
                    return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/jaguatirica/parsed', method: 'POST', queryString: queryString, body: body, headers: headers }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(400);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.body).toEqual('{"error":"Validation Error","error_description":"The following fields failed on validation: a must be a number conforming to the specified constraints"}');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get with ResponseHandler injection', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/b', method: 'GET' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.headers.custom).toEqual('injected by ResponseHandler middleware');
                    expect(response.body).toEqual(JSON.stringify({ message: 'Success' }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get route with CustomMiddleware injection', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/c', method: 'GET' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.headers.custom).toEqual('injected by Middleware middleware');
                    expect(response.body).toEqual(JSON.stringify({ message: 'Success' }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get from another controller', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/other', method: 'GET' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.body).toEqual(JSON.stringify({ message: 'Hello from another controller!' }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should put successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/other', method: 'PUT' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.body).toEqual(JSON.stringify({ message: 'Hello from PUT method' }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should patch successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/other', method: 'PATCH' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.body).toEqual(JSON.stringify({ message: 'Hello from PATCH method' }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should delete successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/other', method: 'DELETE' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.body).toEqual(JSON.stringify({ message: 'Hello from DELETE method' }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should options successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/other', method: 'OPTIONS' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(204);
                    expect(response.body).toEqual('');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should head successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/other', method: 'HEAD' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.body).toEqual('');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should trace successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/other', method: 'TRACE' }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.body).toEqual('');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get controller middleware injection', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({
                        path: '/controller-c',
                        method: 'GET',
                        headers: {
                            'custom-controller-header': 'something special'
                        }
                    }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.body).toEqual('something special');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get controller middleware injection from other method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({
                        path: '/controller-c',
                        method: 'POST',
                        headers: {
                            'custom-controller-header': 'something special'
                        }
                    }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(201);
                    expect(response.body).toEqual('something special');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should process data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var queryString, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryString = {
                        a: 4,
                        b: 25,
                        c: 1
                    };
                    return [4 /*yield*/, server_1["default"].apiHandler((0, create_api_event_1.createAPIGatewayEvent)({ path: '/other/processed', method: 'GET', queryString: queryString }))];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    expect(response.headers['content-type'].startsWith('application/json')).toBeTruthy();
                    expect(response.body).toEqual(JSON.stringify({
                        a: 40,
                        b: 250,
                        c: 10
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
});
