"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
//export const sequelize = new Sequelize("mysql://root:@localhost:3306/jdiazdevhotels ")
exports.db = new sequelize_1.Sequelize('jdiazdevhotels', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
//# sourceMappingURL=connection.js.map