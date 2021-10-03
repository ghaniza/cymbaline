"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNotAllowedException = void 0;
const http_exception_1 = require("./http.exception");
class MethodNotAllowedException extends http_exception_1.HTTPException {
    constructor(error = 'Method Not Allowed', errorDescription) {
        super(405, error, errorDescription);
    }
}
exports.MethodNotAllowedException = MethodNotAllowedException;
//# sourceMappingURL=method-not-allowed.exception.js.map