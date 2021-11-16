import { DataHousting } from "../../services/data-housting";

export interface CreateHoustingRequest {
    createTheHousting(cashId:number, clientId:number, roomId:number, dataHousting:DataHousting):Promise<any>
}