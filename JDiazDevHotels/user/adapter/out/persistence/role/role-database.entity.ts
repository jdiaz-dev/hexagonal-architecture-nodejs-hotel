import { Table, Column } from 'sequelize-typescript'
import { DataTypes, Model } from 'sequelize'
import { db as sequelize } from '../../../../../../db/connection'

@Table
export class RoleDatabaseEntity extends Model{
    
    @Column
    public id!:string

    @Column
    private role!:string
}
RoleDatabaseEntity.init(
    {
        role:{
            type:DataTypes.STRING
        }
    },
    {
        sequelize,
        tableName:'roles'
    }
)



