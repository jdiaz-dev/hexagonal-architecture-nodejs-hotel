"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabaseEntity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../../../../db/connection");
const role_database_entity_1 = require("../role/role-database.entity");
let UserDatabaseEntity = class UserDatabaseEntity extends sequelize_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserDatabaseEntity.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserDatabaseEntity.prototype, "names", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserDatabaseEntity.prototype, "firstSurname", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserDatabaseEntity.prototype, "secondSurname", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserDatabaseEntity.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserDatabaseEntity.prototype, "cellphone", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UserDatabaseEntity.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], UserDatabaseEntity.prototype, "state", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], UserDatabaseEntity.prototype, "roleId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], UserDatabaseEntity.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], UserDatabaseEntity.prototype, "updatedAt", void 0);
UserDatabaseEntity = __decorate([
    sequelize_typescript_1.Table
], UserDatabaseEntity);
exports.UserDatabaseEntity = UserDatabaseEntity;
UserDatabaseEntity.init({
    names: {
        type: sequelize_1.DataTypes.STRING
    },
    firstSurname: {
        type: sequelize_1.DataTypes.STRING
    },
    secondSurname: {
        type: sequelize_1.DataTypes.STRING
    },
    cellphone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: "users",
    sequelize: connection_1.db
});
role_database_entity_1.RoleDatabaseEntity.hasOne(UserDatabaseEntity, {
    foreignKey: {
        name: 'roleId',
        allowNull: false
    },
    //as:'role'
});
UserDatabaseEntity.belongsTo(role_database_entity_1.RoleDatabaseEntity, {
    as: 'role',
    foreignKey: {
        name: 'roleId',
        allowNull: false,
    },
});
//# sourceMappingURL=user-database-entity.js.map