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
exports.RoleDatabaseEntity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../../../../db/connection");
let RoleDatabaseEntity = class RoleDatabaseEntity extends sequelize_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], RoleDatabaseEntity.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], RoleDatabaseEntity.prototype, "role", void 0);
RoleDatabaseEntity = __decorate([
    sequelize_typescript_1.Table
], RoleDatabaseEntity);
exports.RoleDatabaseEntity = RoleDatabaseEntity;
RoleDatabaseEntity.init({
    role: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: connection_1.db,
    tableName: 'roles'
});
//# sourceMappingURL=role-database.entity.js.map