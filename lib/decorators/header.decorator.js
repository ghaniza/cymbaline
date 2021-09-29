"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const Header = (header, value) => {
    return (target, propertyName) => {
        if (!target.headers) {
            Object.defineProperty(target, 'headers', {
                configurable: true,
                get: () => {
                    return [{ header, value }];
                },
                set: () => { }
            });
        }
        else {
            const headers = target.headers;
            Object.defineProperty(target, 'headers', {
                configurable: true,
                get: () => {
                    return [...headers, { header, value }];
                },
                set: () => { }
            });
        }
    };
};
exports.Header = Header;
//# sourceMappingURL=header.decorator.js.map