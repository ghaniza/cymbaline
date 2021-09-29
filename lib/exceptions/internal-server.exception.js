"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerException = void 0;
const http_exception_1 = require("./http.exception");
class InternalServerException extends http_exception_1.HTTPException {
    constructor(error = 'Internal Server Error', errorDescription) {
        super(500, error, errorDescription);
    }
}
exports.InternalServerException = InternalServerException;
//# sourceMappingURL=internal-server.exception.js.map