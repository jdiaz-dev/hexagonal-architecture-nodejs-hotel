"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const hotel_routes_1 = __importDefault(require("../JDiazDevHotels/hotel/routes/hotel.routes"));
class Server {
    constructor() {
        this.paths = {
            hotel: '/jdiaz/hotel'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8080';
        //this.dbconnection()
        this.middlewares();
        this.routes();
    }
    /* async dbconnection(){
        try {
            await db.authenticate()
            console.log('Database online')

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    } */
    middlewares() {
        this.app.use(cors_1.default({}));
        this.app.use(body_parser_1.urlencoded({ extended: false }));
        this.app.use(body_parser_1.json());
    }
    routes() {
        this.app.use(this.paths.hotel, hotel_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('The server is running in PORT', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map