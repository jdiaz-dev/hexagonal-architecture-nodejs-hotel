import { Column, Table } from "sequelize-typescript";
import { DataTypes, Model } from 'sequelize';

import { db as sequelize } from "../../../../../db/connection";
import { Hotel } from "../../../../managament/hotels/infraestucture/out/persistence/hotel.model";

@Table
export class CashDatabaseEntity extends Model {

    @Column
    openingMoney!: number

    @Column
    closingMoney!: number

    @Column
    date!: string

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
Hotel.hasOne(CashDatabaseEntity, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})
CashDatabaseEntity.belongsTo(Hotel, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})

