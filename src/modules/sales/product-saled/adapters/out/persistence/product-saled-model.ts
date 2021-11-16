import { Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize } from '../../../../../../core/db/connection';
import { DataTypes } from 'sequelize';
import { HoustingModel } from '../../../../../housting/adapters/out/persistence/housting.model';
import { ProductModel } from '../../../../products/adapters/out/persistence/product.model';
import { CashModel } from '../../../../../cash/adapters/out/persistence/cash.model';

@Table
export class ProductSaledModel extends Model {
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
ProductSaledModel.init(
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
CashModel.hasOne(ProductSaledModel, {
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});
ProductSaledModel.belongsTo(CashModel, {
    as: 'cash',
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});

//housting
HoustingModel.hasOne(ProductSaledModel, {
    foreignKey: {
        name: 'houstingId',
        allowNull: false,
    },
});
ProductSaledModel.belongsTo(HoustingModel, {
    as: 'housting',
    foreignKey: {
        name: 'houstingId',
        allowNull: false,
    },
});

//product
ProductModel.hasOne(ProductSaledModel, {
    foreignKey: {
        name: 'productId',
        allowNull: false,
    },
});
ProductSaledModel.belongsTo(ProductModel, {
    as: 'product',
    foreignKey: {
        name: 'productId',
        allowNull: false,
    },
});
