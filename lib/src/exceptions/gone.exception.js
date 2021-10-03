"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoneException = void 0;
const http_exception_1 = require("./http.exception");
class GoneException extends http_exception_1.HTTPException {
    constructor(error = 'Gone', errorDescription) {
        super(410, error, errorDescription);
    }
}
exports.GoneException = GoneException;
//# sourceMappingURL=gone.exception.js.map