import { Model, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize } from '../../../../../../db/connection';
import { HoustingModel } from '../../../../../housting/adapters/out/persistence/housting.model';

@Table
export class SaleReportModel extends Model {
    @Column
    public total!: number;

    @Column
    public houstingId!: number;
}
SaleReportModel.init(
    {
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'sale_reports',
    },
);
HoustingModel.hasOne(SaleReportModel, {
    foreignKey: {
        name: 'houstingId',
        allowNull: false,
    },
});
SaleReportModel.belongsTo(HoustingModel, {
    as: 'housting',
    foreignKey: {
        name: 'houstingId',
        allowNull: false,
    },
});
