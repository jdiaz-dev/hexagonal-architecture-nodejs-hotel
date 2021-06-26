"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const bcryptjs_1 = require("bcryptjs");
class UserEntity {
    constructor(names, firstSurname, secondSurname, cellphone, email, role, password) {
        this.names = names;
        this.firstSurname = firstSurname;
        this.secondSurname = secondSurname;
        this.cellphone = cellphone;
        this.email = email;
        this.role = role;
        this.password = password;
    }
    encodePassword() {
        const salt = bcryptjs_1.genSaltSync();
        const passwordEncoded = bcryptjs_1.hashSync(this.password, salt);
        this.password = passwordEncoded;
    }
    decodePassword(password) {
        const validPassword = bcryptjs_1.compareSync(this.password, password);
        return validPassword;
    }
    get getNames() {
        return this.names;
    }
    get getFirstSurname() {
        return this.firstSurname;
    }
    get getSecondSurname() {
        return this.secondSurname;
    }
    get getCellphone() {
        return this.cellphone;
    }
    get getEmail() {
        return this.email;
    }
    get getRole() {
        return this.role;
    }
    get getPassword() {
        return this.password;
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.js.map