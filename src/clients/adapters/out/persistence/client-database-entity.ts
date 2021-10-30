import { Column, Table } from 'sequelize-typescript';
import { DataTypes, Model } from 'sequelize';
import { HotelModel } from '../../../../managament/hotels/adapters/out/persistence/hotel.model';
import { db as sequelize } from '../../../../core/db/connection';

@Table
export class ClientDatabaseEntity extends Model {
    @Column
    names!: string;

    @Column
    surnames!: string;

    @Column
    dni!: number;

    @Column
    cellphone!: number;

    @Column
    visitReason!: string;

    @Column
    hotelId!: number;

    @Column
    state!: boolean;
}
ClientDatabaseEntity.init(
    {
        names: {
            type: DataTypes.STRING,
        },
        surnames: {
            type: DataTypes.STRING,
        },
        dni: {
            type: DataTypes.CHAR(8),
        },
        cellphone: {
            type: DataTypes.INTEGER,
        },
        visitReason: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        tableName: 'clients',
        sequelize,
    },
);
HotelModel.hasOne(ClientDatabaseEntity, {
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
ClientDatabaseEntity.belongsTo(HotelModel, {
    as: 'hotel',
    foreignKey: {
        name: 'hotelId',
        allowNull: false,
    },
});
