import { Service } from 'typedi';
import { ClientPersistenceAdapter } from '../../adapters/out/persistence/client-persistence-adapter';
import { GetClientsPort } from '../ports/out/self-domain/get-clients.port';
import { GetClientsRequest } from '../ports/in/get-clients.request';
import { IQueries } from '../../../../shared/interfaces/query.interface';

@Service()
export class GetClientsService implements GetClientsRequest {
    private getClientsPort: GetClientsPort;

    constructor(clientPersistenceAdapter: ClientPersistenceAdapter) {
        this.getClientsPort = clientPersistenceAdapter;
    }
    async getTheClients(hotelId: number, queries: IQueries): Promise<any> {
        const clients = await this.getClientsPort.getClients(hotelId, queries);
        return clients;
    }
}
