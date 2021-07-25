import { DataTypes, Model } from 'sequelize';
import { Column } from 'sequelize-typescript';
import { HotelDatabaseEntity } from '../../../../../managament/hotels/infraestucture/out/persistence/hotel-mysql.database-entity';
import { db as sequelize } from '../../../../../../db/connection';

export class LevelDatabaseEntity extends Model {

    @Column
    public number!: number

    @Column
    public name!: string

    @Column
    public hotelId!: number

    @Column
    public state!: boolean

}
LevelDatabaseEntity.init(
    {
        number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
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
        tableName: "levels",
        sequelize,
    }
)
HotelDatabaseEntity.hasOne(LevelDatabaseEntity, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})
LevelDatabaseEntity.belongsTo(HotelDatabaseEntity, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    }
})
