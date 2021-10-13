"use strict";
exports.__esModule = true;
exports.AMiddleware = void 0;
var AMiddleware = function (req, res, next) {
    res.setHeader('custom', 'injected by ResponseHandler middleware');
    next();
};
exports.AMiddleware = AMiddleware;
