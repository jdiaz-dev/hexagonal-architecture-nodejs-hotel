import { base } from './base';
import { IEnvironment } from './settings.interfaces';

export const development: IEnvironment = {
    base,
    database: {
        databaseName: 'jdiazdevhotels',
        usernameDB: 'root',
        password: '',
        host: 'localhost',
        dialect: 'mysql',
    },
};
