import { DataClient } from "../../../application/services/data-client";

export interface ClientRepository {
    createClient(hotelId:number, dataClient:DataClient):Promise<any>
    updateClient(clientId:number, dataClient:DataClient):Promise<any>
    getClient(clientId:number):Promise<any>
    getClients(hotelId:number):Promise<any>
}