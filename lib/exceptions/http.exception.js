"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPException = void 0;
class HTTPException extends Error {
    constructor(code, error, error_description, link) {
        super(error);
        this.code = code;
        this.error = error;
        this.error_description = error_description;
        this.link = link;
    }
    toResponse() {
        return {
            error: this.error,
            error_description: this.error_description,
            link: this.link
        };
    }
    static handler(e, req, res, next) {
        console.log(e);
        if (process.env.DEBUG) {
            console.error(e);
        }
        if (e instanceof HTTPException) {
            if (e.error)
                return res.status(e.code).send(e.toResponse());
            return res.sendStatus(e.code);
        }
        if (process.env.DEBUG)
            return res.status(500).send(e.message);
        return res.sendStatus(500);
    }
}
exports.HTTPException = HTTPException;
//# sourceMappingURL=http.exception.js.map