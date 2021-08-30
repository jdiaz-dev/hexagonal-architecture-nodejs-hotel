import { Sequelize } from 'sequelize'
import { SETTINGS } from '../settings/settings'

export const db = new Sequelize(
    SETTINGS.database.databaseName,
    SETTINGS.database.user,
    SETTINGS.database.password,
    {
        host: SETTINGS.database.host,
        dialect: 'mysql'
    }
)

