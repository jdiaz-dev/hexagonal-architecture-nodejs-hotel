import { Sequelize } from 'sequelize'

//export const sequelize = new Sequelize("mysql://root:@localhost:3306/jdiazdevhotels ")
export const db = new Sequelize('jdiazdevhotels', 'root', '', {
    host:'localhost',
    dialect:'mysql'
})



