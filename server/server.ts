import express, { Application } from 'express'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'

import hotelRoutes from '../JDiazDevHotels/hotel/routes/hotel.routes'
import { db } from '../db/connection'

export default class Server {
    private app:Application
    private port:string
    private paths = {
        hotel:'/jdiaz/hotel'
    }

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '8080'

        //this.dbconnection()
        this.middlewares()
        this.routes()
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
    middlewares(){
        this.app.use( cors({}))
        this.app.use( urlencoded({ extended:false }) )
        this.app.use( json() )

    }
    routes(){
        this.app.use(this.paths.hotel, hotelRoutes)
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log('The server is running in PORT', this.port)
        })
    }

}