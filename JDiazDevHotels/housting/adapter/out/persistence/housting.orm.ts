import { Service } from "typedi";
import { DataHousting } from "../../../application/services/data-housting";
import { HoustingRepository } from './housting.repository';
import { HoustingDataBaseEntity } from './housting-database-entity';

@Service()
export class HoustingORM implements HoustingRepository {
    async createHousting(cashId:number, clientId:number, roomId:number, dataHousting:DataHousting):Promise<any>{
        try {
            const housting = new HoustingDataBaseEntity()
            housting.price = dataHousting.price
            housting.moneyPaid = dataHousting.moneyPaid
            housting.entryDate = dataHousting.entryDate
            housting.cashId = cashId
            housting.clientId = clientId
            housting.roomId = roomId

            await housting.save()
            return housting

        } catch (error) {
            console.log('---------------', error)
        }
    }
    async getHousting(houstingId:number):Promise<any>{
        try {
            const housting = HoustingDataBaseEntity.findByPk(houstingId)
            return housting

        } catch (error) {
            console.log('---------------', error)
        }
    }
}