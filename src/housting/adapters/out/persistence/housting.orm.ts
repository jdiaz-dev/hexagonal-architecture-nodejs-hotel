import { Service } from 'typedi';
import { DataHousting } from '../../../application/services/data-housting';
import { HoustingRepository } from './housting.repository';
import { HoustingDataBaseEntity } from './housting-database-entity';
import { ClientDatabaseEntity } from '../../../../clients/adapters/out/persistence/client-database-entity';
import { Room } from '../../../../configuration-hotel/room/adapters/out/persistence/room.model';

@Service()
export class HoustingORM implements HoustingRepository {
    async createHousting(
        cashId: number,
        clientId: number,
        roomId: number,
        dataHousting: DataHousting,
    ): Promise<any> {
        try {
            const housting = new HoustingDataBaseEntity();
            housting.price = dataHousting.price;
            housting.moneyPaid = dataHousting.moneyPaid;
            housting.entryDate = dataHousting.entryDate;
            housting.entryTime = dataHousting.entryTime;
            housting.discountApplied = dataHousting.discountApplied;
            housting.cashId = cashId;
            housting.clientId = clientId;
            housting.roomId = roomId;

            await housting.save();
            return housting;
        } catch (error) {
            console.log('---------------', error);
        }
    }
    async getHousting(houstingId: number): Promise<any> {
        try {
            const housting = HoustingDataBaseEntity.findByPk(houstingId);
            return housting;
        } catch (error) {
            console.log('---------------', error);
        }
    }
    async getHoustingByRoom(roomId: number): Promise<any> {
        try {
            const housting = HoustingDataBaseEntity.findOne({
                where: { roomId: roomId, finished: false },
                attributes: ['id', 'finished', 'entryDate', 'entryTime'],
                include: [
                    {
                        model: ClientDatabaseEntity,
                        as: 'client',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'state', 'hotelId'],
                        },
                    },
                ],
            });
            return housting;
        } catch (error) {
            console.log('---------------', error);
        }
    }
    async updateMoneyPaid(houstingId: number, newMoney: number): Promise<any> {
        try {
            const housting: any = await HoustingDataBaseEntity.findByPk(houstingId);
            housting.moneyPaid = newMoney;
            await housting.save();

            return housting;
        } catch (error) {
            console.log('---------------', error);
        }
    }
    async updateFinish(houstingId: number): Promise<any> {
        try {
            const housting: any = await HoustingDataBaseEntity.findByPk(houstingId);
            housting.finished = true;
            await housting.save();

            return housting;
        } catch (error) {
            console.log('---------------', error);
        }
    }
}
