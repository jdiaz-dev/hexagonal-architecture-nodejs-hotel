import { Column, Table } from "sequelize-typescript";
import { DataTypes, Model } from "sequelize";
import { db as sequelize } from "../../../../../../db/connection";
import { Hotel } from "../../../../../managament/hotels/adapters/out/persistence/hotel.model";

@Table
export class RoomCategory extends Model {
  @Column
  public category!: string;

  @Column
  public price!: number;

  @Column
  public hotelId!: number;

  @Column
  public state!: boolean;
}
RoomCategory.init(
  {
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
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
    tableName: "room_categories",
  }
);
Hotel.hasOne(RoomCategory, {
  foreignKey: {
    name: "hotelId",
    allowNull: false,
  },
});
RoomCategory.belongsTo(Hotel, {
  foreignKey: {
    name: "hotelId",
    allowNull: false,
  },
});
