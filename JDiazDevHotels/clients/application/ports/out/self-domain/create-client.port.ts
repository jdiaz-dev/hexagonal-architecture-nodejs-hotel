import { DataClient } from "../../../services/data-client";

export interface CreateClientPort {
    createClient(hotelId:number, dataClient:DataClient):Promise<any>
}