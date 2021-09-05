import { Table, Column } from "sequelize-typescript";
import { DataTypes, Model } from "sequelize";
import { db as sequelize } from "../../../../../../db/connection";
import { UserDatabaseEntity } from "../../../../users/adapters/out/user-database-entity";

@Table
export class Hotel extends Model {
  @Column
  public name!: string;

  @Column
  public address!: string;

  @Column
  public userId!: number;

  @Column
  public state!: boolean;
}
Hotel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "hotels",
    sequelize,
  }
);
UserDatabaseEntity.hasOne(Hotel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});
Hotel.belongsTo(UserDatabaseEntity, {
  as: "user",
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

/* export const Hotel = db.define('Hotel', {
    name:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    }
})
 */
