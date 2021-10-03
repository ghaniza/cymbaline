"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const http_exception_1 = require("./http.exception");
class NotFoundException extends http_exception_1.HTTPException {
    constructor(error = 'Not Found', errorDescription) {
        super(404, error, errorDescription);
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=not-found.exception.js.map