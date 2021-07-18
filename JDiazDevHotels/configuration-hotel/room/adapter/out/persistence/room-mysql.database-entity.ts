import { Column, Table } from "sequelize-typescript";
import { Model, DataTypes } from "sequelize";
import { db as sequelize } from "../../../../../../db/connection";
import { LevelDatabaseEntity } from '../../../../levels/adapter/out/persistence/level-mysql.database-entity';
import { RoomCategoryDatabaseEntity } from "../../../../room-categories/adapter/out/persistence/room-category-mysql.database-entity";
import { RoomConditionDatabaseEntity } from '../../../../room-condition/adapter/out/persistence/room-condition-mysql.database-entity';


@Table
export class RoomDatabaseEntity extends Model {

    @Column
    name!: string

    @Column
    price!: number

    @Column
    details!: string

    @Column
    levelId!: number

    @Column
    categoryId!: number

    @Column
    conditionId!: number

    @Column
    state!: boolean

}
RoomDatabaseEntity.init(
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

//levelId
LevelDatabaseEntity.hasOne(RoomDatabaseEntity, {
    foreignKey: {
        name: 'levelId',
        allowNull: false
    },
})
RoomDatabaseEntity.belongsTo(LevelDatabaseEntity, {
    as: 'level',
    foreignKey: {
        name: 'levelId',
        allowNull: false
    },
})

//categoryId
RoomCategoryDatabaseEntity.hasOne(RoomDatabaseEntity, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    },
})
RoomDatabaseEntity.belongsTo(RoomCategoryDatabaseEntity, {
    as: 'category',
    foreignKey: {
        name: 'categoryId',
        allowNull: false
    },
})

//conditionId
RoomConditionDatabaseEntity.hasOne(RoomDatabaseEntity, {
    foreignKey: {
        name: 'conditionId',
        allowNull: false
    },
})
RoomDatabaseEntity.belongsTo(RoomConditionDatabaseEntity, {
    as: 'condition',
    foreignKey: {
        name: 'conditionId',
        allowNull: false
    },
})
