"use strict";
exports.__esModule = true;
var src_1 = require("../../src");
var express_1 = require("express");
var database_1 = require("./database");
var a_controller_1 = require("./a/a.controller");
var b_controller_1 = require("./b/b.controller");
var a_queue_1 = require("./a/a.queue");
var b_queue_1 = require("./b/b.queue");
var c_controller_1 = require("./c/c.controller");
var server = new src_1["default"]({
    dependencies: [database_1.Database.configure()],
    controllers: [c_controller_1.CController, a_controller_1.AController, b_controller_1.BController],
    middlewares: [express_1["default"].json(), express_1["default"].urlencoded({ extended: true })],
    queues: [b_queue_1.BQueue, a_queue_1.AQueue]
});
// export const handler = server.getApiHandler()
// export const aQueue = server.getQueueHandler('a-queue')
// export const bQueue = server.getQueueHandler('b-queue')
exports["default"] = server.exportHandlers();
