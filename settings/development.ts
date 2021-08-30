import { base } from "./base";
import { Ienvironment } from "./settings.interfaces";

export const development: Ienvironment = {
    base,
    database: {
        databaseName: process.env.NAME || 'jdiazdevhotels',
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || '',
        host: process.env.HOST || 'localhost',
        dialect: process.env.DIALECT || 'mysql'
    }

}