import { Table, Column } from "sequelize-typescript";
import { Model, DataTypes } from "sequelize";
import { db as sequelize } from "../../../../../../db/connection";

@Table
export class RoomConditionDatabaseEntity extends Model{
    @Column
    public condition!:string

    @Column
    public state!:boolean
}
RoomConditionDatabaseEntity.init(
    {
        condition:{
            type:DataTypes.STRING,
            allowNull:false
        },
        state:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        }
    },
    {
        sequelize,
        tableName:'room_conditions'
    }
)


