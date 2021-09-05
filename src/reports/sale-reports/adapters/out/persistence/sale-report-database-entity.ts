import { Model, DataTypes } from "sequelize";
import { Column, Table } from "sequelize-typescript";
import { db as sequelize } from "../../../../../../db/connection";
import { HoustingDataBaseEntity } from "../../../../../housting/adapters/out/persistence/housting-database-entity";

@Table
export class SaleReportDatabaseEntity extends Model {
  @Column
  public total!: number;

  @Column
  public houstingId!: number;
}
SaleReportDatabaseEntity.init(
  {
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sale_reports",
  }
);
HoustingDataBaseEntity.hasOne(SaleReportDatabaseEntity, {
  foreignKey: {
    name: "houstingId",
    allowNull: false,
  },
});
SaleReportDatabaseEntity.belongsTo(HoustingDataBaseEntity, {
  as: "housting",
  foreignKey: {
    name: "houstingId",
    allowNull: false,
  },
});
