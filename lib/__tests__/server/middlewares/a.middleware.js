"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AMiddleware = void 0;
const AMiddleware = (req, res, next) => {
    res.setHeader('custom', 'injected by ResponseHandler middleware');
    next();
};
exports.AMiddleware = AMiddleware;
//# sourceMappingURL=a.middleware.js.map