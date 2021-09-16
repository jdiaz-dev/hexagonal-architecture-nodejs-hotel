import { Column, Table } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';

import { db as sequelize } from '../../../../../db/connection';
import { Hotel } from '../../../../managament/hotels/adapters/out/persistence/hotel.model';

@Table
export class CashDatabaseModel extends Model {
    @Column
    openingMoney!: number;

    @Column
    closingMoney!: number;

    @Column
    date!: string;

    @Column
    time!: string;

    @Column
    closed!: boolean;

    @Column
    hotelId!: number;
}

CashDatabaseModel.init(
    {
        openingMoney: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        closingMoney: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.DATEONLY, //date recommendable in UTC
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME, //date recommendable in UTC
            allowNull: false,
        },
        closed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'cashes',
    },
);
Hotel.hasOne(CashDatabaseModel, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
CashDatabaseModel.belongsTo(Hotel, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
