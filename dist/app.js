"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const server_1 = __importDefault(require("./server/server"));
console.log('---------------------environment', process.env.PORT);
const server = new server_1.default();
server.runServer();
//# sourceMappingURL=app.js.map