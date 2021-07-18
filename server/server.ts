import express, { Application } from 'express'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'

import { db as sequelize } from '../db/connection'

import userRoutes from '../JDiazDevHotels/managament/users/users/adapter/in/users.routes'
import productRoutes from '../JDiazDevHotels/sales/products/adapter/in/web/product.routes'
import productSaleRoutes from '../JDiazDevHotels/sales/product-sales/adapter/in/web/product-sale.routes'


import clientRoutes from '../JDiazDevHotels/clients/adapter/in/web/client.routes'

import rolesRoutes from '../JDiazDevHotels/managament/users/roles/adapter/in/roles.routes'

import hotelRoutes from '../JDiazDevHotels/managament/hotels/adapters/in/web/hotel.routes'
import levelRoutes from '../JDiazDevHotels/configuration-hotel/levels/adapter/in/web/level.routes'

import roomConditionRoutes from '../JDiazDevHotels/configuration-hotel/room-condition/adapter/in/web/room.routes'
import roomCategoryRoutes from '../JDiazDevHotels/configuration-hotel/room-categories/adapter/in/web/room-category.routes'
import roomRoutes from '../JDiazDevHotels/configuration-hotel/room/adapter/in/web/room.routes'

import cashRoutes from '../JDiazDevHotels/cash/adapter/in/web/cash.routes'
import houstingRoutes from '../JDiazDevHotels/housting/adapter/in/web/housting.routes'

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
        this.app.use(cors({}))
        this.app.use(urlencoded({ extended: false }))
        this.app.use(json())
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
    listen() {
        this.app.listen(this.port, () => {
            console.log('The server is running in PORT', this.port)
        })
    }

}

