import { DataTypes, Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize } from '../../../../../db/connection';
import { CashModel } from '../../../../cash/adapters/out/persistence/cash.model';
import { HotelModel } from '../../../../managament/hotels/adapters/out/persistence/hotel.model';

@Table
export class DailyReportModel extends Model {
    @Column
    id!: number;

    @Column
    moneyHousting!: number;

    @Column
    moneySales!: number;

    @Column
    moneyTotal!: number;

    @Column
    hotelId!: number;

    @Column
    cashId!: number;
}
DailyReportModel.init(
    {
        moneyHousting: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        moneySales: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        moneyTotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'daily_reports',
    },
);

//hotel
HotelModel.hasOne(DailyReportModel, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
DailyReportModel.belongsTo(HotelModel, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});

//cash
CashModel.hasOne(DailyReportModel, {
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});
DailyReportModel.belongsTo(CashModel, {
    as: 'cash',
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});
