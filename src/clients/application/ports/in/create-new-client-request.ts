import { DataClient } from "../../services/data-client";

export interface CreateNewClientRequest {
    createNewClient(hotelId:number, dataClient:DataClient):Promise<any>
} 