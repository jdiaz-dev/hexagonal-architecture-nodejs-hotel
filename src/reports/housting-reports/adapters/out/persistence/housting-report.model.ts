import { Model, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize } from '../../../../../../db/connection';

import { CashDatabaseModel } from '../../../../../cash/adapters/out/persistence/cash-database.model';
import { HoustingModel } from '../../../../../housting/adapters/out/persistence/housting.model';
import { SaleReportModel } from '../../../../sale-reports/adapters/out/persistence/sale-report.model';

@Table
export class HoustingReportModel extends Model {
    @Column
    total!: number;

    @Column
    cashId!: number;

    @Column
    houstingId!: number;

    @Column
    saleReportId!: number;
}

HoustingReportModel.init(
    {
        total: {
            type: DataTypes.FLOAT,
        },
    },
    {
        sequelize,
        tableName: 'housting_reports',
    },
);

//cash
CashDatabaseModel.hasOne(HoustingReportModel, {
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});
HoustingReportModel.belongsTo(CashDatabaseModel, {
    as: 'cash',
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});

//housting
HoustingModel.hasOne(HoustingReportModel, {
    foreignKey: {
        name: 'houstingId',
        allowNull: false,
    },
});
HoustingReportModel.belongsTo(HoustingModel, {
    as: 'housting',
    foreignKey: {
        name: 'houstingId',
        allowNull: false,
    },
});

//sale report
SaleReportModel.hasOne(HoustingReportModel, {
    foreignKey: {
        name: 'saleReportId',
        allowNull: false,
    },
});
HoustingReportModel.belongsTo(SaleReportModel, {
    as: 'saleReport',
    foreignKey: {
        name: 'saleReportId',
        allowNull: false,
    },
});
