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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Controller = void 0;
var tsyringe_1 = require("tsyringe");
var crypto_1 = require("crypto");
var Controller = function (path) {
    return function (constructor) {
        var ControllerClass = /** @class */ (function (_super) {
            __extends(ControllerClass, _super);
            function ControllerClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.controllerName = constructor.name;
                _this.path = path;
                _this.middlewares = [];
                return _this;
            }
            var _a;
            ControllerClass.uid = (_a = constructor.uid) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)();
            ControllerClass = __decorate([
                (0, tsyringe_1.injectable)()
            ], ControllerClass);
            return ControllerClass;
        }(constructor));
        return ControllerClass;
    };
};
exports.Controller = Controller;
