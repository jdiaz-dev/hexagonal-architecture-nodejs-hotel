import { Column, Table } from "sequelize-typescript";
import { DataTypes, Model } from 'sequelize';

import { db as sequelize } from "../../../../../db/connection";
import { HotelDatabaseEntity } from "../../../../managament/hotels/adapters/out/persistence/hotel-mysql.database-entity";

@Table
export class CashDatabaseEntity extends Model {

    @Column
    openingMoney!: number

    @Column
    closingMoney!: number

    @Column
    date!: number

    @Column
    closed!: boolean

    @Column
    hotelId!: number
}

CashDatabaseEntity.init(
    {
        openingMoney: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        closingMoney: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE, //date recommnedable in UTC
            allowNull: false
        },
        closed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

    },
    {
        sequelize,
        tableName: 'cashes'
    }
)
HotelDatabaseEntity.hasOne(CashDatabaseEntity, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})
CashDatabaseEntity.belongsTo(HotelDatabaseEntity, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})

