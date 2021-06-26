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
exports.Token = void 0;
const typedi_1 = require("typedi");
const jsonwebtoken_1 = require("jsonwebtoken");
const get_user_service_1 = require("./../../user/application/service/users/get-user.service");
let Token = class Token {
    constructor(getUserService) {
        this.getUserForTokenPort = getUserService;
    }
    validateJWT(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.header('jdevhotel-token'); //setting a custom token name
            //check if token exists in header
            if (!token) {
                return res.status(400).json({
                    msg: 'There is not a token in the request'
                });
            }
            //validate token
            try {
                //const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY) //here we can to pick the payload
                const payload = jsonwebtoken_1.verify(token, process.env.SECRETORPRIVATEKEY || 'jdevhotels');
                const user = yield this.getUserForTokenPort.getUserForToken(payload.id);
                if (!user) {
                    res.status(401).json({
                        msg: 'It token is not valid - user does not exist in DB'
                    });
                }
                if (!user.state) {
                    res.status(401).json({
                        msg: 'It token is not valid - user with state:false'
                    });
                }
                //req.uid = uid //adiing uid to request
                req.user = user;
            }
            catch (error) {
                console.log(error);
                res.status(401).json({
                    msg: 'Token is not valid'
                });
            }
            next();
        });
    }
};
Token = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [get_user_service_1.GetUserService])
], Token);
exports.Token = Token;
//# sourceMappingURL=token.js.map