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
exports.HotelDatabaseEntity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../../../../db/connection");
const user_database_entity_1 = require("../../../../../user/adapter/out/persistence/user/user-database-entity");
let HotelDatabaseEntity = class HotelDatabaseEntity extends sequelize_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], HotelDatabaseEntity.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], HotelDatabaseEntity.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], HotelDatabaseEntity.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], HotelDatabaseEntity.prototype, "state", void 0);
HotelDatabaseEntity = __decorate([
    sequelize_typescript_1.Table
], HotelDatabaseEntity);
exports.HotelDatabaseEntity = HotelDatabaseEntity;
HotelDatabaseEntity.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: "hotels",
    sequelize: connection_1.db,
});
user_database_entity_1.UserDatabaseEntity.hasOne(HotelDatabaseEntity, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});
HotelDatabaseEntity.belongsTo(user_database_entity_1.UserDatabaseEntity, {
    as: 'user',
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});
/* export const Hotel = db.define('Hotel', {
    name:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    }
})
 */
//# sourceMappingURL=hotel-mysql.database-entity.js.map