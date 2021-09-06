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
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const connection_1 = require("../db/connection");
const users_routes_1 = __importDefault(require("../src/managament/users/adapters/in/users.routes"));
const product_routes_1 = __importDefault(require("../src/sales/products/adapters/in/web/product.routes"));
const product_sale_routes_1 = __importDefault(require("../src/sales/product-sales/adapters/in/web/product-sale.routes"));
const client_routes_1 = __importDefault(require("../src/clients/adapters/in/web/client.routes"));
const roles_routes_1 = __importDefault(require("../src/managament/roles/adapters/in/roles.routes"));
const hotel_routes_1 = __importDefault(require("../src/managament/hotels/adapters/in/web/hotel.routes"));
const level_routes_1 = __importDefault(require("../src/configuration-hotel/levels/adapters/in/web/level.routes"));
const room_routes_1 = __importDefault(require("../src/configuration-hotel/room-condition/adapters/in/web/room.routes"));
const room_category_routes_1 = __importDefault(require("../src/configuration-hotel/room-categories/adapters/in/web/room-category.routes"));
const room_routes_2 = __importDefault(require("../src/configuration-hotel/room/adapters/in/web/room.routes"));
const cash_routes_1 = __importDefault(require("../src/cash/adapters/in/web/cash.routes"));
const housting_routes_1 = __importDefault(require("../src/housting/adapters/in/web/housting.routes"));
class Server {
    constructor() {
        this.paths = {
            //users
            roles: "/jdev/roles",
            users: "/jdev/users",
            clients: "/jdev/clients",
            //hotels
            hotel: "/jdev/hotel",
            levels: "/jdev/levels",
            //rooms
            rooms: "/jdev/rooms",
            roomCategories: "/jdev/room-categories",
            roomCondition: "/jdev/room-condition",
            //products
            products: "/jdev/products",
            productSales: "/jdev/product-sales",
            cash: "/jdev/cash",
            housting: "/jdev/housting",
        };
        this.app = express_1.default();
        this.port = process.env.PORT || "8080";
        this.dbconnection();
        this.middlewares();
        this.security();
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
            connection_1.db
                .sync({ force: false })
                .then(() => {
                console.log("Connection with database was done SUCCESSFULLY!!!");
            })
                .catch((error) => {
                console.log("An ERROR trying to connect with database has happend", error);
            });
        });
    }
    middlewares() {
        this.app.use(body_parser_1.urlencoded({ extended: false }));
        this.app.use(body_parser_1.json());
    }
    security() {
        const limiter = express_rate_limit_1.default({
            windowMs: 60 * 60 * 1000,
            max: 200,
            message: "You can not make more of two calls",
        });
        //this.app.use(limiter) //to limit number of request
        this.app.use(cors_1.default({}));
        this.app.use(helmet_1.default());
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
        this.app.use(this.paths.productSales, product_sale_routes_1.default);
        this.app.use(this.paths.cash, cash_routes_1.default);
        this.app.use(this.paths.housting, housting_routes_1.default);
    }
    runServer() {
        this.app.listen(this.port, () => {
            console.log("The server is running in PORT", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map