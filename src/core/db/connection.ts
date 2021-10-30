import { Sequelize } from 'sequelize';
import { SETTINGS } from '../../shared/settings/settings';

const dialect = process.env.NODE_ENVIRONMENT == 'production' ? 'mariadb' : 'mysql';
export const db = new Sequelize(
    SETTINGS.database.databaseName,
    SETTINGS.database.usernameDB,
    SETTINGS.database.password,
    {
        host: SETTINGS.database.host,
        dialect: dialect,
    },
);
