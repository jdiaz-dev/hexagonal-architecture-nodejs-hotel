import express, { Application } from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { db as sequelize } from './db/connection';
import userRoutes from '../modules/managament/users/adapters/in/users.routes';
import productRoutes from '../modules/sales/products/adapters/in/web/product.routes';
import productSaleRoutes from '../modules/sales/product-saled/adapters/in/web/product-saled.routes';
import clientRoutes from '../modules/clients/adapters/in/web/client.routes';
import rolesRoutes from '../modules/managament/roles/adapters/in/roles.routes';
import hotelRoutes from '../modules/managament/hotels/adapters/in/web/hotel.routes';
import levelRoutes from '../modules/configuration-hotel/levels/adapters/in/web/level.routes';
import roomConditionRoutes from '../modules/configuration-hotel/room-condition/adapters/in/web/room.routes';
import roomCategoryRoutes from '../modules/configuration-hotel/room-categories/adapters/in/web/room-category.routes';
import roomRoutes from '../modules/configuration-hotel/room/adapters/in/web/room.routes';
import cashRoutes from '../modules/cash/adapters/in/web/cash.routes';
import houstingRoutes from '../modules/housting/adapters/in/web/housting.routes';
import houstingReport from '../modules/reports/housting-reports/adapters/in/web/housting-report.routes';
import dailyReports from '../modules/reports/daily-reports/adapters/in/daily-report.routes';

export default class Server {
    private app: Application;
    private port: string;
    private paths = {
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
        productSales: '/jdev/product-sales',
        cash: '/jdev/cash',

        //housting
        housting: '/jdev/housting',
        houstingReport: '/jdev/housting-report',

        //reports
        dailyReport: '/jdev/daily-reports',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.dbconnection();
        this.middlewares();
        this.security();
        this.routes();
    }
    async dbconnection() {
        /* try {
            await db.authenticate()
            console.log('Database online')

        } catch (error) {
            console.log(error)
            throw new Error(error)
        } */

        sequelize
            .sync({ force: false })
            .then(() => {
                console.log('Connection with database was done SUCCESSFULLY!!!');
            })
            .catch((error) => {
                console.log('An ERROR trying to connect with database has happend', error);
            });
    }
    middlewares() {
        this.app.use(urlencoded({ extended: false }));
        this.app.use(json());
    }
    security() {
        const limiter = rateLimit({
            windowMs: 60 * 60 * 1000,
            max: 200,
            message: 'You can not make more of two calls',
        });
        //this.app.use(limiter) //to limit number of request
        this.app.use(cors({}));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'application/json');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        this.app.use(helmet());
    }

    routes() {
        //users
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.roles, rolesRoutes);
        this.app.use(this.paths.clients, clientRoutes);

        //hotel
        this.app.use(this.paths.hotel, hotelRoutes);
        this.app.use(this.paths.levels, levelRoutes);

        //rooms
        this.app.use(this.paths.rooms, roomRoutes);
        this.app.use(this.paths.roomCategories, roomCategoryRoutes);
        this.app.use(this.paths.roomCondition, roomConditionRoutes);

        //products
        this.app.use(this.paths.products, productRoutes);
        this.app.use(this.paths.productSales, productSaleRoutes);
        this.app.use(this.paths.cash, cashRoutes);

        //housting
        this.app.use(this.paths.housting, houstingRoutes);
        this.app.use(this.paths.houstingReport, houstingReport);

        //reports
        this.app.use(this.paths.dailyReport, dailyReports);
    }
    runServer() {
        this.app.listen(this.port, () => {
            console.log('The server is running in PORT', this.port);
        });
    }
}
