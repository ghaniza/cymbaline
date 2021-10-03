"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BService = void 0;
class BService {
    async processedData(data) {
        return Object.keys(data).reduce((p, c) => {
            return { ...p, [c]: data[c] * 10 };
        }, {});
    }
    async sqsMessage(msgId, message) {
        return `[${msgId}] The message is: ${message}`;
    }
}
exports.BService = BService;
//# sourceMappingURL=b.service.js.map