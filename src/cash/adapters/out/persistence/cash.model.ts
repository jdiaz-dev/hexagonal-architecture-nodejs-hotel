import { Column, Table } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';

import { db as sequelize } from '../../../../../db/connection';
import { HotelModel } from '../../../../managament/hotels/adapters/out/persistence/hotel.model';

@Table
export class CashModel extends Model {
    @Column
    id!: number;

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

CashModel.init(
    {
        openingMoney: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        closingMoney: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
HotelModel.hasOne(CashModel, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
CashModel.belongsTo(HotelModel, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
