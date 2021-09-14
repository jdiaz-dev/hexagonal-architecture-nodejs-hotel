import { Service } from 'typedi';
import { CreateHoustingPort } from '../../../application/ports/out/self-domain/create-housting.port';
import { DataHousting } from '../../../application/services/data-housting';
import { HoustingORM } from './housting.orm';
import { GetHoustingPort } from '../../../application/ports/out/self-domain/get-housting.port';
import { GetHoustingModeledPort } from '../../../application/ports/out/self-domain/get-housting-modeled.port';
import { HoustingDomainEntity } from '../../../domain/housting';
import { UpdateMoneyPaidPort } from '../../../application/ports/out/self-domain/update-money-paid.port';
import { UpdateFinishPort } from '../../../application/ports/out/self-domain/update-finish.port';
import { GetHoustingByRoomPort } from '../../../application/ports/out/self-domain/get-housting-by-room.port';

@Service()
export class HoustingPersistenceAdapter
    implements
        CreateHoustingPort,
        GetHoustingPort,
        GetHoustingByRoomPort,
        GetHoustingModeledPort,
        UpdateMoneyPaidPort,
        UpdateFinishPort
{
    constructor(private houstingORM: HoustingORM) {}

    async createHousting(
        cashId: number,
        clientId: number,
        roomId: number,
        dataHousting: DataHousting,
    ): Promise<any> {
        const housting = await this.houstingORM.createHousting(cashId, clientId, roomId, dataHousting);
        return housting;
    }
    async getHousting(houstingId: number): Promise<any> {
        const housting = await this.houstingORM.getHousting(houstingId);
        return housting;
    }
    async getHoustingByRoom(roomId: number): Promise<any> {
        const housting = await this.houstingORM.getHoustingByRoom(roomId);
        return housting;
    }
    async getHoustingModeled(roomId: number): Promise<HoustingDomainEntity> {
        const housting = await this.houstingORM.getHoustingByRoom(roomId);
        return new HoustingDomainEntity(housting.cashId, housting.clientId, housting.roomId);
    }
    async updateMoneyPaid(houstingId: number, newMoney: number): Promise<any> {
        const housting = await this.houstingORM.updateMoneyPaid(houstingId, newMoney);
        return housting;
    }
    async updateFinish(houstingId: number): Promise<any> {
        const housting = await this.houstingORM.updateFinish(houstingId);
        return housting;
    }
}
