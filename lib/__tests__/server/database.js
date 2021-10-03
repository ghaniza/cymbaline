"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
class Database {
    static configure() {
        return async () => new Promise((res, rej) => {
            setTimeout(() => {
                process.env.DEBUG && console.log('Database connected');
                res(null);
            }, 50);
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map