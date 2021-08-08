import { Service } from "typedi";
import { ClientPersistenceAdapter } from "../../infraestructure/out/persistence/client-persistence-adapter";
import { GetClientsPort } from "../ports/out/self-domain/get-clients.port";
import { GetClientsRequest } from './../ports/in/get-clients.request';

@Service()
export class GetClientsService implements GetClientsRequest {
    private getClientsPort: GetClientsPort

    constructor(
        clientPersistenceAdapter: ClientPersistenceAdapter
    ) {
        this.getClientsPort = clientPersistenceAdapter
    }
    async getTheClients(hotelId: number): Promise<any> {
        const clients = await this.getClientsPort.getClients(hotelId)
        return clients
    }
}