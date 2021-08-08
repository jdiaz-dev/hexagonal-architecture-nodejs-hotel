import { Model, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize } from '../../../../../../db/connection';


import { CashDatabaseEntity } from '../../../../../cash/infraestructure/out/persistence/cash-database-entity';
import { HoustingDataBaseEntity } from '../../../../../housting/infraestructure/out/persistence/housting-database-entity';
import { SaleReportDatabaseEntity } from '../../../../sale-reports/infraestructure/out/persistence/sale-report-database-entity';

@Table
export class HoustingReportDatabaseEntity extends Model {

    @Column
    total!: number

    @Column
    cashId!: number

    @Column
    houstingId!: number

    @Column
    saleReportId!: number | null
}

HoustingReportDatabaseEntity.init(
    {
        total: {
            type: DataTypes.FLOAT
        }
    },
    {
        sequelize,
        tableName: 'housting_reports'
    }
)

//cash
CashDatabaseEntity.hasOne(HoustingReportDatabaseEntity, {
    foreignKey: {
        name: 'cashId',
        allowNull: false
    }
})
HoustingReportDatabaseEntity.belongsTo(CashDatabaseEntity, {
    as: 'cash',
    foreignKey: {
        name: 'cashId',
        allowNull: false
    }
})



//housting
HoustingDataBaseEntity.hasOne(HoustingReportDatabaseEntity, {
    foreignKey: {
        name: 'houstingId',
        allowNull: false
    }
})
HoustingReportDatabaseEntity.belongsTo(HoustingDataBaseEntity, {
    as: 'housting',
    foreignKey: {
        name: 'houstingId',
        allowNull: false
    }
})


//sale report
SaleReportDatabaseEntity.hasOne(HoustingReportDatabaseEntity, {
    foreignKey: {
        name: 'saleReportId',
        allowNull: false
    }
})
HoustingReportDatabaseEntity.belongsTo(SaleReportDatabaseEntity, {
    as: 'saleReport',
    foreignKey: {
        name: 'saleReportId',
        allowNull: false
    }
})