import { Column, Table } from "sequelize-typescript";
import { Model, DataTypes } from "sequelize";
import { db as sequelize} from "../../../../../../db/connection";


@Table
export class RoomDatabaseEntity extends Model {

    @Column
    name!:string

    @Column
    price!:number

    @Column
    details!:string

    @Column
    state!:boolean

}
RoomDatabaseEntity.init(
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.NUMBER,
            allowNull:false
        },
        details:{
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
        tableName:'room'
    }
)
