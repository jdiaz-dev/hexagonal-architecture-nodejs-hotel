import { Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize } from '../../../../../../db/connection';
import { DataTypes } from 'sequelize';
import { HoustingModel } from '../../../../../housting/adapters/out/persistence/housting.model';
import { ProductModel } from '../../../../products/adapters/out/persistence/product.model';
import { CashDatabaseModel } from '../../../../../cash/adapters/out/persistence/cash-database.model';

@Table
export class ProductSalesDatabaseEntity extends Model {
    @Column
    amount!: number;

    @Column
    totalPrice!: number;

    @Column
    date!: string;

    @Column
    time!: string;

    @Column
    houstingId!: number;

    @Column
    cashId!: number;

    @Column
    productId!: number;

    @Column
    payed!: boolean;
}
ProductSalesDatabaseEntity.init(
    {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        payed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'product_sales',
    },
);

//cash
CashDatabaseModel.hasOne(ProductSalesDatabaseEntity, {
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});
ProductSalesDatabaseEntity.belongsTo(CashDatabaseModel, {
    as: 'cash',
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});

//housting
HoustingModel.hasOne(ProductSalesDatabaseEntity, {
    foreignKey: {
        name: 'houstingId',
        allowNull: false,
    },
});
ProductSalesDatabaseEntity.belongsTo(HoustingModel, {
    as: 'housting',
    foreignKey: {
        name: 'houstingId',
        allowNull: false,
    },
});

//product
ProductModel.hasOne(ProductSalesDatabaseEntity, {
    foreignKey: {
        name: 'productId',
        allowNull: false,
    },
});
ProductSalesDatabaseEntity.belongsTo(ProductModel, {
    as: 'product',
    foreignKey: {
        name: 'productId',
        allowNull: false,
    },
});
