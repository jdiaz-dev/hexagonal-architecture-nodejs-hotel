import { Table, Column } from 'sequelize-typescript';
import { Model, DataTypes } from 'sequelize';
import { db as sequelize } from '../../../../../core/db/connection';

@Table
export class RoomConditionDatabaseEntity extends Model {
    @Column
    public nameCondition!: string;

    @Column
    public state!: boolean;
}
RoomConditionDatabaseEntity.init(
    {
        nameCondition: {
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
        tableName: 'room_conditions',
    },
);
