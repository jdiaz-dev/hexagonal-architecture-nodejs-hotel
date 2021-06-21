import { Table, Column } from 'sequelize-typescript'
import { DataTypes, Model } from 'sequelize'
import { db as sequelize } from '../../../../../../db/connection'

@Table
export class Hotel extends Model {

    @Column
    public name!: string

    @Column
    public address!: string

}
Hotel.init(
    {
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: "hotels",
        sequelize,
    }
)

/* export const Hotel = db.define('Hotel', {
    name:{
        type:DataTypes.STRING
    },
    address:{
        type:DataTypes.STRING
    }
})
 */

