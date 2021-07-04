import { DataHousting } from "../../../application/services/data-housting";

export interface HoustingRepository {
    createHousting(cashId:number, clientId:number, roomId:number, dataHousting:DataHousting):Promise<any>
    getHousting(houstingId:number):Promise<any>
}