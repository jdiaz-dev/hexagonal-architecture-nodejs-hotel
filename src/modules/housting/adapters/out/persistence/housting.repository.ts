import { DataHousting } from '../../../application/services/data-housting';

export interface HoustingRepository {
    createHousting(cashId: number, clientId: number, roomId: number, dataHousting: DataHousting): Promise<any>;
    getHousting(houstingId: number): Promise<any>;
    getHoustingByRoom(roomId: number): Promise<any>;
    getHoustingByRoomToModel(roomId: number): Promise<any>;
    updateMoneyPaid(houstingId: number, newMoney: number): Promise<any>;
    updateFinish(houstingId: number): Promise<any>;
}
