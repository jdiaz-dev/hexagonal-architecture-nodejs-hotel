import { DataTypes, Model } from "sequelize";
import { Column } from "sequelize-typescript";
import { Hotel } from "../../../../../managament/hotels/adapters/out/persistence/hotel.model";
import { db as sequelize } from "../../../../../../db/connection";

export class Level extends Model {
  @Column
  public number!: number;

  @Column
  public name!: string;

  @Column
  public hotelId!: number;

  @Column
  public state!: boolean;
}
Level.init(
  {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "levels",
    sequelize,
  }
);
Hotel.hasOne(Level, {
  foreignKey: {
    name: "hotelId",
    allowNull: false,
  },
});
Level.belongsTo(Hotel, {
  as: "hotel",
  foreignKey: {
    name: "hotelId",
    allowNull: false,
  },
});
