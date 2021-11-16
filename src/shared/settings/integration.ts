import { base } from './base';
import { IEnvironment } from './settings.interfaces';

export const integration: IEnvironment = {
    base,
    database: {
        databaseName: 'jdiazinthotels',
        usernameDB: 'root',
        password: '',
        host: 'localhost',
        dialect: 'mysql',
    },
};
