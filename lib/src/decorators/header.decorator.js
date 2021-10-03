"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const Header = (header, value) => {
    return (target, propertyKey) => {
        if (Reflect.hasMetadata(propertyKey, target)) {
            const previous = Reflect.getMetadata(propertyKey, target);
            Reflect.defineMetadata(propertyKey, {
                ...previous,
                headers: [...previous.headers, [header, value]],
            }, target);
        }
        else {
            const data = {
                propertyKey,
                headers: [[header, value]],
            };
            Reflect.defineMetadata(propertyKey, data, target);
        }
    };
};
exports.Header = Header;
//# sourceMappingURL=header.decorator.js.map