import express, { Application } from 'express'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'

import hotelRoutes from '../JDiazDevHotels/hotel/routes/hotel.routes'
import userRoutes from '../JDiazDevHotels/user/routes/users.routes'
import rolesRoutes from '../JDiazDevHotels/user/routes/roles.routes'

import { db as sequelize } from '../db/connection'

export default class Server {
    private app:Application
    private port:string
    private paths = {
        hotel:'/jdev/hotel',
        users:'/jdev/users',
        roles:'/jdev/roles/'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '8080'

        this.dbconnection()
        this.middlewares()
        this.routes()
    }
    async dbconnection(){
        /* try {
            await db.authenticate()
            console.log('Database online')

        } catch (error) {
            console.log(error)
            throw new Error(error)
        } */

        sequelize.sync({ force:false }).then(() => {
            console.log('Connection with database was done SUCCESSFULLY!!!')
        }).catch( error => {
            console.log('An ERROR trying to connect with database has happend', error)
        })
    }
    middlewares(){
        this.app.use( cors({}))
        this.app.use( urlencoded({ extended:false }) )
        this.app.use( json() )
    }
    routes(){
        this.app.use(this.paths.hotel, hotelRoutes)
        this.app.use(this.paths.users, userRoutes)
        this.app.use(this.paths.roles, rolesRoutes)
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log('The server is running in PORT', this.port)
        })
    }

}
