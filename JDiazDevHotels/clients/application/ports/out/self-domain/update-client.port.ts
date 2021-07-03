import { DataClient } from "../../../services/data-client";
import { ClientCommand } from "../../in/client.command";

export interface UpdateClientPort {
    updateClient(clientId:number, dataClient:DataClient):Promise<any>
}