"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return tsyringe_1.injectable; } });
const server_1 = require("./server");
const dotenv_1 = require("dotenv");
require("../__tests__/server");
(0, dotenv_1.config)();
exports.default = server_1.Server;
//# sourceMappingURL=index.js.map