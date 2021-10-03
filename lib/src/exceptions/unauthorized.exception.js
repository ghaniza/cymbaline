"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const http_exception_1 = require("./http.exception");
class UnauthorizedException extends http_exception_1.HTTPException {
    constructor(error = 'Unauthorized', errorDescription) {
        super(401, error, errorDescription);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=unauthorized.exception.js.map