import { Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize} from '../../../../../db/connection';
import { DataTypes } from 'sequelize';
import { HoustingDataBaseEntity } from '../../../../housting/adapter/out/persistence/housting-database-entity';
import { ProductDatabaseEntity } from '../../../../products/adapter/out/persistence/product-database.entity';
import { CashDatabaseEntity } from '../../../../cash/adapter/out/persistence/cash-database-entity';

@Table
export class ProductSalesDatabaseEntity extends Model {
    
    @Column
    amount!:number

    @Column
    totalPrice!:number

    @Column
    date!:string

    @Column
    houstingId!:number

    @Column
    cashId!:number

    @Column
    productId!:number

    @Column
    payed!:boolean
}
ProductSalesDatabaseEntity.init(
    {
        amount:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        totalPrice:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        payed:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        }
    },
    {
        sequelize,
        tableName:'product_sales'
    }
)

//cash
CashDatabaseEntity.hasOne(ProductSalesDatabaseEntity, {
    foreignKey:{
        name:'cashId',
        allowNull:false
    },
})
ProductSalesDatabaseEntity.belongsTo(CashDatabaseEntity, {
    as:'cash',
    foreignKey:{
        name:'cashId',
        allowNull:false
    },
})

//housting
HoustingDataBaseEntity.hasOne(ProductSalesDatabaseEntity , {
    foreignKey:{
        name:'houstingId',
        allowNull:false
    },
})
ProductSalesDatabaseEntity.belongsTo(HoustingDataBaseEntity ,{
    as:'housting',
    foreignKey:{
        name:'houstingId',
        allowNull:false
    },
})


//product
ProductDatabaseEntity.hasOne(ProductSalesDatabaseEntity ,{
    foreignKey:{
        name:'productId',
        allowNull:false
    },
})
ProductSalesDatabaseEntity.belongsTo(ProductDatabaseEntity, {
    as:'product',
    foreignKey:{
        name:'productId',
        allowNull:false
    },
})

