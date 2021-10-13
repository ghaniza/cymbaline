"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.HTTPException = void 0;
var HTTPException = /** @class */ (function (_super) {
    __extends(HTTPException, _super);
    function HTTPException(code, error, error_description, link) {
        var _this = _super.call(this, error) || this;
        _this.code = code;
        _this.error = error;
        _this.error_description = error_description;
        _this.link = link;
        return _this;
    }
    HTTPException.prototype.toResponse = function () {
        return {
            error: this.error,
            error_description: this.error_description,
            link: this.link
        };
    };
    HTTPException.handler = function (e, req, res, logger) {
        if (process.env.DEBUG && e instanceof HTTPException) {
            switch (true) {
                case e.code >= 400 && e.code < 500:
                    logger.log('warn', e);
                    break;
                case e.code >= 500:
                    logger.log('error', e);
                    break;
                default:
                    logger.log('info', e);
                    break;
            }
        }
        else if (process.env.DEBUG) {
            console.log(e);
        }
        if (e instanceof HTTPException) {
            if (e.error)
                return res.status(e.code).send(e.toResponse());
            return res.sendStatus(e.code);
        }
        if (process.env.DEBUG)
            return res.status(500).send(e.message);
        return res.sendStatus(500);
    };
    return HTTPException;
}(Error));
exports.HTTPException = HTTPException;
