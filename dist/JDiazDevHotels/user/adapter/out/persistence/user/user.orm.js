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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserORM = void 0;
const typedi_1 = require("typedi");
const user_database_entity_1 = require("./user-database-entity");
const role_orm_1 = require("./../role/role.orm");
let UserORM = class UserORM {
    constructor(roleORM) {
        this.roleORM = roleORM;
    }
    saveUser(dataUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleORM.searchRole(dataUser.getRole);
            const user = yield user_database_entity_1.UserDatabaseEntity.create({
                names: dataUser.getNames,
                firstSurname: dataUser.getFirstSurname,
                secondSurname: dataUser.getSecondSurname,
                cellphone: dataUser.getCellphone,
                email: dataUser.getEmail,
                password: dataUser.getPassword,
                roleId: role.id
            });
            /* const role = new RoleDatabaseEntity(
                {
                    role:dataUser.role,
                    userId:user.id
                }
            )
            await role.save()
             */
            return user;
        });
    }
    getUserWithEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_database_entity_1.UserDatabaseEntity.findOne({ where: { email: email } });
            if (!user)
                return null;
            return user.toJSON();
        });
    }
    getuserWithPk(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_database_entity_1.UserDatabaseEntity.findByPk(id, {
                include: 'role',
                attributes: { exclude: ['roleId'] }
            });
            if (!user)
                return null;
            return user.toJSON();
        });
    }
};
UserORM = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [role_orm_1.RoleORM])
], UserORM);
exports.UserORM = UserORM;
//# sourceMappingURL=user.orm.js.map