import { DataHousting } from "../../../services/data-housting";

export interface CreateHoustingPort {
    createHousting(cashId:number, clientId:number, roomId:number, dataHousting:DataHousting):Promise<any>
}