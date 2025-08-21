import { base } from './base';
import { IEnvironment } from './settings.interfaces';

export const development: IEnvironment = {
    base,
    database: {
        databaseName: process.env.NAME as string,
        usernameDB: process.env.USERNAME_DB as string,
        password: process.env.PASSWORD as string,
        host: process.env.HOST as string,
        dialect: process.env.DIALECT as string,
    },
};
