"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const jwt = require('jsonwebtoken')
const generateJWT = (user) => {
    return new Promise((resolve, reject) => {
        //the "uid" is the only thing that will be added in the payload
        const payload = { id: user.id, names: user.names };
        // to sign a token
        jsonwebtoken_1.default.sign(payload, (process.env.SECRETORPRIVATEKEY || 'jdevhotels'), {
            expiresIn: '1d' // to expire in 1 day
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('It was impossible to generate the token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=generate-jwt.js.map