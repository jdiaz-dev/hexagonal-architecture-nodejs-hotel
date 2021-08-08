import { Service } from "typedi";
import { UpdateClientRequest } from "../ports/in/update-client.request";
import { DataClient } from "./data-client";
import { UpdateClientPort } from './../ports/out/self-domain/update-client.port';
import { ClientPersistenceAdapter } from '../../infraestructure/out/persistence/client-persistence-adapter';
import { ClientCommand } from "../ports/in/client.command";
import { GetClientModeledPort } from "../ports/out/self-domain/get-client-modeled.port";
import { ClientDomainEntity } from "../../domain/clients";

@Service()
export class UpdateClientService implements UpdateClientRequest {
    private updateClientPort: UpdateClientPort
    private getClientModeledPort: GetClientModeledPort

    constructor(clientPersistenceAdapter: ClientPersistenceAdapter) {
        this.updateClientPort = clientPersistenceAdapter
        this.getClientModeledPort = clientPersistenceAdapter
    }
    async updateTheClient(clientId: number, command: ClientCommand, dataClient: DataClient): Promise<any> {
        const client: ClientDomainEntity = await this.getClientModeledPort.getClientModeled(clientId)

        if (!client.checkIfClientBelongsToHotel(command.getHotelId)) {
            return { message: 'You cannot update this client' }
        }

        const clientUpdated = await this.updateClientPort.updateClient(clientId, dataClient)
        console.log('--------------------client in service', clientUpdated)
        return clientUpdated
    }
}