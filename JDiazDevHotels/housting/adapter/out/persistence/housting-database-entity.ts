import { DataTypes, Model } from "sequelize";
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize } from "../../../../../db/connection";
import { CashDatabaseEntity } from "../../../../cash/adapter/out/persistence/cash-database-entity";
import { ClientDatabaseEntity } from './../../../../clients/adapter/out/persistence/client-database-entity';
import { RoomDatabaseEntity } from './../../../../rooms/room/adapter/out/persistence/room-mysql.database-entity';

@Table
export class HoustingDataBaseEntity extends Model {
    
    @Column
    price!:number

    @Column
    moneyPaid!:number

    @Column
    entryDate!:string

    @Column
    outputDate!:number

    @Column
    houstingTime!:number

    @Column
    lateApplied!:boolean

    @Column
    cashId!:number

    @Column
    clientId!:number

    @Column
    roomId!:number

    

}
HoustingDataBaseEntity.init(
    {
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        moneyPaid:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        entryDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        outputDate:{
            type:DataTypes.DATE,
        },
        houstingTime:{
            type:DataTypes.TIME,
        },
        lateApplied:{
            type:DataTypes.BOOLEAN,
        },
        finished:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false
        },
 
    },
    {
        sequelize,
        tableName:'houstings'

    }
)

//client 
ClientDatabaseEntity.hasOne(HoustingDataBaseEntity, {
    foreignKey:{
        name:'clientId',
        allowNull:false
    }
    
})
HoustingDataBaseEntity.belongsTo(ClientDatabaseEntity, {
    as:'client',
    foreignKey:{
        name:'clientId',
        allowNull:false
    }
})

//room
RoomDatabaseEntity.hasOne(HoustingDataBaseEntity, {
    foreignKey:{
        name:'roomId',
        allowNull:false
    }
    
})
HoustingDataBaseEntity.belongsTo(RoomDatabaseEntity, {
    as:'room',
    foreignKey:{
        name:'roomId',
        allowNull:false
    }
})

//cash
CashDatabaseEntity.hasOne(HoustingDataBaseEntity, {
    foreignKey:{
        name:'cashId',
        allowNull:false
    }
    
})
HoustingDataBaseEntity.belongsTo(CashDatabaseEntity, {
    as:'cash',
    foreignKey:{
        name:'cashId',
        allowNull:false
    }
})
