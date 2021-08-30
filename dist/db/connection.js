"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const settings_1 = require("../settings/settings");
exports.db = new sequelize_1.Sequelize(settings_1.SETTINGS.database.databaseName, settings_1.SETTINGS.database.user, settings_1.SETTINGS.database.password, {
    host: settings_1.SETTINGS.database.host,
    dialect: 'mysql'
});
//# sourceMappingURL=connection.js.map