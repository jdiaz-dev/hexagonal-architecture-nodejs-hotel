import { base } from "./base";
import { Ienvironment } from "./settings.interfaces";

export const production: Ienvironment = {
    base,
    database: {
        databaseName: process.env.NAME || '',
        user: process.env.USERNAME || '',
        password: process.env.PASSWORD || '',
        host: process.env.HOST || '',
        dialect: process.env.DIALECT || ''
    }
}