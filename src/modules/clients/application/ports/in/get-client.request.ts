import { ClientCommand } from "./client.command";

export interface GetClientRequest {
    getTheClient(clientId:number, command:ClientCommand):Promise<any>
}