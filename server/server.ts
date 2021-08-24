import express, { Application } from 'express'
import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { db as sequelize } from '../db/connection'
import userRoutes from '../JDiazDevHotels/managament/users/infraestructure/in/users.routes'
import productRoutes from '../JDiazDevHotels/sales/products/infraestructure/in/web/product.routes'
import productSaleRoutes from '../JDiazDevHotels/sales/product-sales/infraestructure/in/web/product-sale.routes'
import clientRoutes from '../JDiazDevHotels/clients/infraestructure/in/web/client.routes'
import rolesRoutes from '../JDiazDevHotels/managament/roles/infraestructure/in/roles.routes'
import hotelRoutes from '../JDiazDevHotels/managament/hotels/infraestucture/in/web/hotel.routes'
import levelRoutes from '../JDiazDevHotels/configuration-hotel/levels/infraestructure/in/web/level.routes'
import roomConditionRoutes from '../JDiazDevHotels/configuration-hotel/room-condition/infraestructure/in/web/room.routes'
import roomCategoryRoutes from '../JDiazDevHotels/configuration-hotel/room-categories/infraestructure/in/web/room-category.routes'
import roomRoutes from '../JDiazDevHotels/configuration-hotel/room/infraestructure/in/web/room.routes'
import cashRoutes from '../JDiazDevHotels/cash/infraestructure/in/web/cash.routes'
import houstingRoutes from '../JDiazDevHotels/housting/infraestructure/in/web/housting.routes'

export default class Server {
    private app: Application
    private port: string
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
        housting: '/jdev/housting',

    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8080'

        this.dbconnection()
        this.middlewares()
        this.security()
        this.routes()
    }
    async dbconnection() {
        /* try {
            await db.authenticate()
            console.log('Database online')

        } catch (error) {
            console.log(error)
            throw new Error(error)
        } */

        sequelize.sync({ force: false }).then(() => {
            console.log('Connection with database was done SUCCESSFULLY!!!')
        }).catch(error => {
            console.log('An ERROR trying to connect with database has happend', error)
        })
    }
    middlewares() {
        this.app.use(urlencoded({ extended: false }))
        this.app.use(json())
    }
    security() {
        const limiter = rateLimit({
            windowMs: 60 * 60 * 1000,
            max: 200,
            message: 'You can not make more of two calls'
        })
        this.app.use(limiter) //to limit number of request
        this.app.use(cors({}))
        this.app.use(helmet())


    }

    routes() {
        //users
        this.app.use(this.paths.users, userRoutes)
        this.app.use(this.paths.roles, rolesRoutes)
        this.app.use(this.paths.clients, clientRoutes)

        //hotel
        this.app.use(this.paths.hotel, hotelRoutes)
        this.app.use(this.paths.levels, levelRoutes)

        //rooms
        this.app.use(this.paths.rooms, roomRoutes)
        this.app.use(this.paths.roomCategories, roomCategoryRoutes)
        this.app.use(this.paths.roomCondition, roomConditionRoutes)

        //products
        this.app.use(this.paths.products, productRoutes)
        this.app.use(this.paths.productSales, productSaleRoutes)
        this.app.use(this.paths.cash, cashRoutes)
        this.app.use(this.paths.housting, houstingRoutes)

    }
    runServer() {
        this.app.listen(this.port, () => {
            console.log('The server is running in PORT', this.port)
        })
    }

}

