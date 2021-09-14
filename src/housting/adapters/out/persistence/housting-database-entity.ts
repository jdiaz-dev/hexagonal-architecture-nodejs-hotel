import { DataTypes, Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';
import { db as sequelize } from '../../../../../db/connection';
import { CashDatabaseEntity } from '../../../../cash/adapters/out/persistence/cash-database-entity';
import { ClientDatabaseEntity } from '../../../../clients/adapters/out/persistence/client-database-entity';
import { Room } from '../../../../configuration-hotel/room/adapters/out/persistence/room.model';

@Table
export class HoustingDataBaseEntity extends Model {
    @Column
    price!: number;

    @Column
    moneyPaid!: number;

    @Column
    entryDate!: string;

    @Column
    entryTime!: string;

    @Column
    outputDate!: number;

    @Column
    outputTime!: string;

    @Column
    houstingTime!: number;

    @Column
    discountApplied!: number;

    @Column
    lateApplied!: boolean;

    @Column
    finished!: boolean;

    @Column
    cashId!: number;

    @Column
    clientId!: number;

    @Column
    roomId!: number;
}
HoustingDataBaseEntity.init(
    {
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        moneyPaid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        entryDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        entryTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        outputDate: {
            type: DataTypes.DATEONLY,
        },
        outputTime: {
            type: DataTypes.TIME,
        },
        houstingTime: {
            type: DataTypes.TIME,
        },
        discountApplied: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lateApplied: {
            type: DataTypes.BOOLEAN,
        },
        finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'houstings',
    },
);

//client
ClientDatabaseEntity.hasOne(HoustingDataBaseEntity, {
    foreignKey: {
        name: 'clientId',
        allowNull: false,
    },
});
HoustingDataBaseEntity.belongsTo(ClientDatabaseEntity, {
    as: 'client',
    foreignKey: {
        name: 'clientId',
        allowNull: false,
    },
});

//room
Room.hasOne(HoustingDataBaseEntity, {
    foreignKey: {
        name: 'roomId',
        allowNull: false,
    },
});
HoustingDataBaseEntity.belongsTo(Room, {
    as: 'room',
    foreignKey: {
        name: 'roomId',
        allowNull: false,
    },
});

//cash
CashDatabaseEntity.hasOne(HoustingDataBaseEntity, {
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});
HoustingDataBaseEntity.belongsTo(CashDatabaseEntity, {
    as: 'cash',
    foreignKey: {
        name: 'cashId',
        allowNull: false,
    },
});
