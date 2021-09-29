"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLogger = void 0;
class DefaultLogger {
    log(level, args) {
        console[level](args);
    }
}
exports.DefaultLogger = DefaultLogger;
//# sourceMappingURL=logger.js.map