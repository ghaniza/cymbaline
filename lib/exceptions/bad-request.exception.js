"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const http_exception_1 = require("./http.exception");
class BadRequestException extends http_exception_1.HTTPException {
    constructor(error = 'Bad Request', errorDescription) {
        super(400, error, errorDescription);
    }
}
exports.BadRequestException = BadRequestException;
//# sourceMappingURL=bad-request.exception.js.map