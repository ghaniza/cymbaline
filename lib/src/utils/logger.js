"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class DefaultLogger {
    log(level, args) {
        if (!process.env.DEBUG)
            return;
        let color;
        switch (level) {
            case 'error':
                color = 'red';
                break;
            case 'warn':
                color = 'yellow';
                break;
            default:
                color = 'white';
        }
        console[level](chalk_1.default[color](args));
    }
}
exports.DefaultLogger = DefaultLogger;
//# sourceMappingURL=logger.js.map