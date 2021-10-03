"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const http_exception_1 = require("./http.exception");
class ForbiddenException extends http_exception_1.HTTPException {
    constructor(error = 'Forbidden', errorDescription) {
        super(403, error, errorDescription);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=forbidden.exception.js.map