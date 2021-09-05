import { DataClient } from "../../services/data-client";
import { ClientCommand } from "./client.command";

export interface UpdateClientRequest {
    updateTheClient(clientId:number, command:ClientCommand, dataClient:DataClient):Promise<any>
}