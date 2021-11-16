import { Model, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize } from '../../../../../../core/db/connection';

import { CashModel } from '../../../../../cash/adapters/out/persistence/cash.model';
import { HoustingModel } from '../../../../../housting/adapters/out/persistence/housting.model';
import { SaleReportModel } from '../../../../sale-reports/adapters/out/persistence/sale-report.model';

@Table
export class HoustingReportModel extends Model {
    @Column
    id!: number;

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
CashModel.hasOne(HoustingReportModel, {
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});
HoustingReportModel.belongsTo(CashModel, {
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
    },
});
HoustingReportModel.belongsTo(SaleReportModel, {
    as: 'saleReport',
    foreignKey: {
        name: 'saleReportId',
    },
});
