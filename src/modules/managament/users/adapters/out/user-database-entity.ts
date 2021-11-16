import { Table, Column } from 'sequelize-typescript';
import { Model, DataTypes } from 'sequelize';

import { db as sequelize } from '../../../../../core/db/connection';
import { RoleDatabaseEntity } from '../../../roles/adapters/out/role-database.entity';

@Table
export class UserDatabaseEntity extends Model {
    @Column
    public id!: string; //primary key

    @Column
    public names!: string;

    @Column
    public firstSurname!: string;

    @Column
    public secondSurname!: string;

    @Column
    public username!: string;

    @Column
    public cellphone!: number;

    @Column
    public email!: string;

    @Column
    public state!: boolean;

    @Column
    public roleId!: number;

    @Column
    public readonly createdAt!: Date;

    @Column
    public readonly updatedAt!: Date;
}
UserDatabaseEntity.init(
    {
        names: {
            type: DataTypes.STRING,
        },
        firstSurname: {
            type: DataTypes.STRING,
        },
        secondSurname: {
            type: DataTypes.STRING,
        },
        cellphone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
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
        tableName: 'users',
        sequelize,
    },
);
RoleDatabaseEntity.hasOne(UserDatabaseEntity, {
    foreignKey: {
        name: 'roleId',
        allowNull: false,
    },
    //as:'role'
});
UserDatabaseEntity.belongsTo(RoleDatabaseEntity, {
    as: 'role',
    foreignKey: {
        name: 'roleId',
        allowNull: false,
    },
});
