"use strict";
exports.__esModule = true;
exports.DefaultLogger = void 0;
var chalk_1 = require("chalk");
var DefaultLogger = /** @class */ (function () {
    function DefaultLogger() {
    }
    DefaultLogger.prototype.log = function (level, args) {
        if (!process.env.DEBUG)
            return;
        var color;
        switch (level) {
            case 'error':
                color = 'red';
                break;
            case 'warn':
                color = 'yellow';
                break;
            default:
                color = 'white';
        }
        console[level](chalk_1["default"][color](args));
    };
    return DefaultLogger;
}());
exports.DefaultLogger = DefaultLogger;
