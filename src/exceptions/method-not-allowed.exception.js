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
exports.MethodNotAllowedException = void 0;
var http_exception_1 = require("./http.exception");
var MethodNotAllowedException = /** @class */ (function (_super) {
    __extends(MethodNotAllowedException, _super);
    function MethodNotAllowedException(error, errorDescription) {
        if (error === void 0) { error = 'Method Not Allowed'; }
        return _super.call(this, 405, error, errorDescription) || this;
    }
    return MethodNotAllowedException;
}(http_exception_1.HTTPException));
exports.MethodNotAllowedException = MethodNotAllowedException;
