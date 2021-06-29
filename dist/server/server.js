"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const connection_1 = require("../db/connection");
const hotel_routes_1 = __importDefault(require("../JDiazDevHotels/hotel/hotels/adapters/in/web/hotel.routes"));
const room_routes_1 = __importDefault(require("../JDiazDevHotels/hotel/adapter/in/web/room/room.routes"));
const level_routes_1 = __importDefault(require("../JDiazDevHotels/hotel/levels/adapter/in/web/level.routes"));
const roles_routes_1 = __importDefault(require("../JDiazDevHotels/user/routes/roles.routes"));
const users_routes_1 = __importDefault(require("../JDiazDevHotels/user/routes/users.routes"));
class Server {
    constructor() {
        this.paths = {
            hotel: '/jdev/hotel',
            levels: '/jdev/levels',
            roles: '/jdev/roles',
            users: '/jdev/users',
            rooms: '/jdev/rooms',
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8080';
        this.dbconnection();
        this.middlewares();
        this.routes();
    }
    dbconnection() {
        return __awaiter(this, void 0, void 0, function* () {
            /* try {
                await db.authenticate()
                console.log('Database online')
    
            } catch (error) {
                console.log(error)
                throw new Error(error)
            } */
            connection_1.db.sync({ force: false }).then(() => {
                console.log('Connection with database was done SUCCESSFULLY!!!');
            }).catch(error => {
                console.log('An ERROR trying to connect with database has happend', error);
            });
        });
    }
    middlewares() {
        this.app.use(cors_1.default({}));
        this.app.use(body_parser_1.urlencoded({ extended: false }));
        this.app.use(body_parser_1.json());
    }
    routes() {
        this.app.use(this.paths.hotel, hotel_routes_1.default);
        this.app.use(this.paths.levels, level_routes_1.default);
        this.app.use(this.paths.roles, roles_routes_1.default);
        this.app.use(this.paths.users, users_routes_1.default);
        this.app.use(this.paths.rooms, room_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('The server is running in PORT', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map