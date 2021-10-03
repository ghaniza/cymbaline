"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bQueue = exports.aQueue = exports.handler = void 0;
const src_1 = __importDefault(require("../../src"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const a_controller_1 = require("./a/a.controller");
const b_controller_1 = require("./b/b.controller");
const a_queue_1 = require("./a/a.queue");
const b_queue_1 = require("./b/b.queue");
const c_controller_1 = require("./c/c.controller");
const create_api_event_1 = require("../utils/create-api-event");
const server = new src_1.default({
    dependencies: [database_1.Database.configure()],
    controllers: [c_controller_1.CController, a_controller_1.AController, b_controller_1.BController],
    middlewares: [express_1.default.json(), express_1.default.urlencoded({ extended: true })],
    queues: [b_queue_1.BQueue, a_queue_1.AQueue],
});
exports.handler = server.getApiHandler();
exports.aQueue = server.getQueueHandler('a-queue');
exports.bQueue = server.getQueueHandler('b-queue');
async function run() {
    const response = await (0, exports.handler)((0, create_api_event_1.apiEvent)({
        path: '/controller-c',
        method: 'GET',
        headers: {
            'custom-controller-header': 'something special',
        },
    }));
    console.log({ response });
}
run();
//# sourceMappingURL=index.js.map