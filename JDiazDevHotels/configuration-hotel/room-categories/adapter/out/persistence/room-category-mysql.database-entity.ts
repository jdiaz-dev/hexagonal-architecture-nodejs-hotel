import { Column, Table } from "sequelize-typescript";
import { DataTypes, Model } from "sequelize";
import { db as sequelize } from "../../../../../../db/connection";
import { HotelDatabaseEntity } from "../../../../../managament/hotels/infraestucture/out/persistence/hotel-mysql.database-entity";

@Table
export class RoomCategoryDatabaseEntity extends Model {

    @Column
    public category!: string

    @Column
    public hotelId!: number

    @Column
    public state!: boolean
}
RoomCategoryDatabaseEntity.init(
    {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'room_categories'
    }
)
HotelDatabaseEntity.hasOne(RoomCategoryDatabaseEntity, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})
RoomCategoryDatabaseEntity.belongsTo(HotelDatabaseEntity, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})

