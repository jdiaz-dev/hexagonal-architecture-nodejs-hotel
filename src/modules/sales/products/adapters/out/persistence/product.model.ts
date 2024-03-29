import { Column, Table } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';
import { db as sequelize } from '../../../../../../core/db/connection';
import { HotelModel } from '../../../../../managament/hotels/adapters/out/persistence/hotel.model';

@Table
export class ProductModel extends Model {
    @Column
    id!: number;

    @Column
    code!: string;

    @Column
    name!: string;

    @Column
    brand!: string;

    @Column
    details!: string;

    @Column
    price!: number;

    @Column
    state!: boolean;

    @Column
    hotelId!: number;
}
ProductModel.init(
    {
        code: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
        },
        details: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'products',
    },
);
HotelModel.hasOne(ProductModel, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
ProductModel.belongsTo(HotelModel, {
    as: 'product',
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
