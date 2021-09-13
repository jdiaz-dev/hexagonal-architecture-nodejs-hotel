import { Column, Table } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';
import { db as sequelize } from '../../../../../../db/connection';
import { Hotel } from '../../../../../managament/hotels/adapters/out/persistence/hotel.model';

@Table
export class ProductModel extends Model {
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
Hotel.hasOne(ProductModel, {
  foreignKey: {
    name: 'hotelId',
    allowNull: false,
  },
});
ProductModel.belongsTo(Hotel, {
  as: 'product',
  foreignKey: {
    name: 'hotelId',
    allowNull: false,
  },
});
