import { Column, Table } from 'sequelize-typescript';
import { Model, DataTypes } from 'sequelize';
import { db as sequelize } from '../../../../../core/db/connection';
import { Level } from '../../../../levels/adapters/out/persistence/level.model';
import { RoomCategory } from '../../../../room-categories/adapters/out/persistence/room-category.model';
import { RoomConditionDatabaseEntity } from '../../../../room-condition/adapters/out/persistence/room-condition-mysql.database-entity';
import { HotelModel } from '../../../../../managament/hotels/adapters/out/persistence/hotel.model';

@Table
export class RoomModel extends Model {
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    price!: number;

    @Column
    details!: string;

    @Column
    hotelId!: number;

    @Column
    levelId!: number;

    @Column
    categoryId!: number;

    @Column
    conditionId!: number;

    @Column
    state!: boolean;
}
RoomModel.init(
    {
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        details: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'rooms',
    },
);

//hotelId
HotelModel.hasOne(RoomModel, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
RoomModel.belongsTo(HotelModel, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});

//levelId
Level.hasOne(RoomModel, {
    foreignKey: {
        name: 'levelId',
        allowNull: false,
    },
});
RoomModel.belongsTo(Level, {
    as: 'level',
    foreignKey: {
        name: 'levelId',
        allowNull: false,
    },
});

//categoryId
RoomCategory.hasOne(RoomModel, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false,
    },
});
RoomModel.belongsTo(RoomCategory, {
    as: 'category',
    foreignKey: {
        name: 'categoryId',
        allowNull: false,
    },
});

//conditionId
RoomConditionDatabaseEntity.hasOne(RoomModel, {
    foreignKey: {
        name: 'conditionId',
        allowNull: false,
    },
});
RoomModel.belongsTo(RoomConditionDatabaseEntity, {
    as: 'condition',
    foreignKey: {
        name: 'conditionId',
        allowNull: false,
    },
});
