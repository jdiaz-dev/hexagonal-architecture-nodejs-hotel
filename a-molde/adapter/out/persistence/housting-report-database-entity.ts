import { Model, DataTypes } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

/* import { db as sequelize} from '../../../../../../db/connection';

import { CashDatabaseEntity } from '../../../../../cash/adapter/out/persistence/cash-database-entity';
import { HoustingDataBaseEntity } from '../../../../../housting/adapter/out/persistence/housting-database-entity';
import { SaleReportDatabaseEntity } from './../../../../sale-reports/adapter/out/persistence/sale-report-database-entity'; */

@Table
export class anyDatabaseEntity extends Model{
    
    @Column
    total!:number

    @Column
    cashId!:number

    @Column
    houstingId!:number

    @Column
    saleReportId!:number
}

/* HoustingReportDatabaseEntity.init(
    {
        total:{
            type:DataTypes.FLOAT
        }
    },
    {
        sequelize,
        tableName:'housting_reports'
    }
)
 */
