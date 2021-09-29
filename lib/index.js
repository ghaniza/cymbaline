"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "Injectable", { enumerable: true, get: function () { return tsyringe_1.injectable; } });
const server_1 = require("./server");
exports.default = server_1.Server;
require("./__tests__/a.module");
//# sourceMappingURL=index.js.map