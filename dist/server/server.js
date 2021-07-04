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
const users_routes_1 = __importDefault(require("../JDiazDevHotels/users/routes/users.routes"));
const product_routes_1 = __importDefault(require("../JDiazDevHotels/products/adapter/in/web/product.routes"));
const client_routes_1 = __importDefault(require("../JDiazDevHotels/clients/adapter/in/web/client.routes"));
const roles_routes_1 = __importDefault(require("../JDiazDevHotels/users/routes/roles.routes"));
const hotel_routes_1 = __importDefault(require("../JDiazDevHotels/hotel/hotels/adapters/in/web/hotel.routes"));
const level_routes_1 = __importDefault(require("../JDiazDevHotels/hotel/levels/adapter/in/web/level.routes"));
const room_routes_1 = __importDefault(require("../JDiazDevHotels/rooms/room-condition/adapter/in/web/room.routes"));
const room_category_routes_1 = __importDefault(require("../JDiazDevHotels/rooms/room-category/adapter/in/web/room-category.routes"));
const room_routes_2 = __importDefault(require("../JDiazDevHotels/rooms/room/adapter/in/web/room.routes"));
const cash_routes_1 = __importDefault(require("../JDiazDevHotels/cash/adapter/in/web/cash.routes"));
const housting_routes_1 = __importDefault(require("../JDiazDevHotels/housting/adapter/in/web/housting.routes"));
class Server {
    constructor() {
        this.paths = {
            //users
            roles: '/jdev/roles',
            users: '/jdev/users',
            clients: '/jdev/clients',
            //hotels
            hotel: '/jdev/hotel',
            levels: '/jdev/levels',
            //rooms
            rooms: '/jdev/rooms',
            roomCategories: '/jdev/room-categories',
            roomCondition: '/jdev/room-condition',
            //products
            products: '/jdev/products',
            cash: '/jdev/cash',
            housting: '/jdev/housting',
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
        //users
        this.app.use(this.paths.users, users_routes_1.default);
        this.app.use(this.paths.roles, roles_routes_1.default);
        this.app.use(this.paths.clients, client_routes_1.default);
        //hotel
        this.app.use(this.paths.hotel, hotel_routes_1.default);
        this.app.use(this.paths.levels, level_routes_1.default);
        //rooms
        this.app.use(this.paths.rooms, room_routes_2.default);
        this.app.use(this.paths.roomCategories, room_category_routes_1.default);
        this.app.use(this.paths.roomCondition, room_routes_1.default);
        //products
        this.app.use(this.paths.products, product_routes_1.default);
        this.app.use(this.paths.cash, cash_routes_1.default);
        this.app.use(this.paths.housting, housting_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('The server is running in PORT', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map