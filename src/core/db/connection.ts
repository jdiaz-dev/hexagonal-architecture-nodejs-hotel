import { Sequelize } from 'sequelize';
import { SETTINGS } from '../../shared/settings/settings';

console.log('---------------env', process.env.NODE_ENVIRONMENT);
console.log('---------------env', SETTINGS.database.databaseName);
console.log('---------------env', SETTINGS.database.usernameDB);
console.log('---------------env', SETTINGS.database.password);
console.log('---------------env', SETTINGS.database.host);

export const db = new Sequelize(
    SETTINGS.database.databaseName,
    SETTINGS.database.usernameDB,
    SETTINGS.database.password,
    {
        host: SETTINGS.database.host,
        dialect: 'mysql',
    },
);
