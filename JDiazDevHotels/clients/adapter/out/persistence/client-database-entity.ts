import { Column, Table } from "sequelize-typescript";
import { DataTypes, Model } from 'sequelize';
import { HotelDatabaseEntity } from "../../../../managament/hotels/infraestucture/out/persistence/hotel-mysql.database-entity";
import { db as sequelize } from "../../../../../db/connection";

@Table
export class ClientDatabaseEntity extends Model {

    @Column
    names!: string

    @Column
    surnames!: string

    @Column
    dni!: number

    @Column
    cellphone!: number

    @Column
    visitReason!: string

    @Column
    hotelId!: number

    @Column
    state!: boolean

}
ClientDatabaseEntity.init(
    {
        names: {
            type: DataTypes.STRING
        },
        surnames: {
            type: DataTypes.STRING
        },
        dni: {
            type: DataTypes.CHAR(8)
        },
        cellphone: {
            type: DataTypes.INTEGER,
        },
        visitReason: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "clients",
        sequelize
    }
)
HotelDatabaseEntity.hasOne(ClientDatabaseEntity, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})
ClientDatabaseEntity.belongsTo(HotelDatabaseEntity, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})
