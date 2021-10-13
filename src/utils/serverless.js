"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Serverless = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var serverless_constants_1 = require("./serverless.constants");
var Serverless = /** @class */ (function () {
    function Serverless() {
        this.functions = {};
        this.package = serverless_constants_1.DEFAULT_PACKAGE_OPTIONS;
        this.provider = serverless_constants_1.DEFAULT_PROVIDER_OPTIONS;
        var filePath = path_1["default"].resolve('package.json');
        var info = JSON.parse(fs_1["default"].readFileSync(filePath).toString());
        this.service = info.name;
    }
    Serverless.prototype.addFunction = function (functionName, options) {
        var _a;
        this.functions = __assign(__assign({}, this.functions), (_a = {}, _a[functionName] = __assign({}, options), _a));
    };
    Serverless.prototype.saveMetadata = function (metadataDir) {
        var filePath = path_1["default"].resolve(metadataDir, '.serverless.json');
        fs_1["default"].writeFileSync(filePath, JSON.stringify(this.toObject()));
    };
    Serverless.prototype.toObject = function () {
        return {
            service: this.service,
            useDotenv: true,
            functions: this.functions,
            package: this.package
        };
    };
    return Serverless;
}());
exports.Serverless = Serverless;
