import { Table, Column } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';
import { db as sequelize } from '../../../../../core/db/connection';

@Table
export class RoleDatabaseEntity extends Model {
    @Column
    public id!: string;

    @Column
    public nameRole!: string;

    @Column
    public state!: boolean;
}
RoleDatabaseEntity.init(
    {
        nameRole: {
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
        tableName: 'roles',
    },
);
