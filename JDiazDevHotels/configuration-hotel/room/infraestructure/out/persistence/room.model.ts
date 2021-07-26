import { Column, Table } from "sequelize-typescript";
import { Model, DataTypes } from "sequelize";
import { db as sequelize } from "../../../../../../db/connection";
import { Level } from '../../../../levels/infraestructure/out/persistence/level.model';
import { RoomCategory } from "../../../../room-categories/infraestructure/out/persistence/room-category.model";
import { RoomConditionDatabaseEntity } from '../../../../room-condition/infraestructure/out/persistence/room-condition-mysql.database-entity';
import { Hotel } from "../../../../../managament/hotels/infraestucture/out/persistence/hotel.model";


@Table
export class Room extends Model {

    @Column
    name!: string

    @Column
    price!: number

    @Column
    details!: string

    @Column
    hotelId!: number

    @Column
    levelId!: number

    @Column
    categoryId!: number

    @Column
    conditionId!: number

    @Column
    state!: boolean

}
Room.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        details: {
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
        tableName: 'rooms'
    }
)

//hotelId
Hotel.hasOne(Room, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    },
})
Room.belongsTo(Hotel, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false
    },
})

//levelId
Level.hasOne(Room, {
    foreignKey: {
        name: 'levelId',
        allowNull: false
    },
})
Room.belongsTo(Level, {
    as: 'level',
    foreignKey: {
        name: 'levelId',
        allowNull: false
    },
})

//categoryId
RoomCategory.hasOne(Room, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    },
})
Room.belongsTo(RoomCategory, {
    as: 'category',
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    },
})

//conditionId
RoomConditionDatabaseEntity.hasOne(Room, {
    foreignKey: {
        name: 'conditionId',
        allowNull: false
    },
})
Room.belongsTo(RoomConditionDatabaseEntity, {
    as: 'condition',
    foreignKey: {
        name: 'conditionId',
        allowNull: false
    },
})
