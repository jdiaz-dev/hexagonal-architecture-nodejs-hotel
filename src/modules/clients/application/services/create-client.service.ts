import { Service } from 'typedi';
import { ClientPersistenceAdapter } from '../../adapters/out/persistence/client-persistence-adapter';
import { CreateNewClientRequest } from '../ports/in/create-new-client-request';
import { CreateClientPort } from '../ports/out/self-domain/create-client.port';
import { DataClient } from './data-client';
import { GetHotelForClientDomain } from '../ports/out/other-domain/get-hotel-for-client-domain';
import { GetHotelService } from '../../../managament/hotels/application/services/get-hotel.service';

@Service()
export class CreateClientService implements CreateNewClientRequest {
    //other domains
    private getHotelForClientDomain: GetHotelForClientDomain;

    private createClientPort: CreateClientPort;

    constructor(
        //other domains
        getHotelService: GetHotelService,

        //self ports
        clientPersistenceAdapter: ClientPersistenceAdapter,
    ) {
        //other domains
        this.getHotelForClientDomain = getHotelService;

        //self ports
        this.createClientPort = clientPersistenceAdapter;
    }

    async createNewClient(hotelId: number, dataClient: DataClient): Promise<any> {
        const hotel = await this.getHotelForClientDomain.getHotelForClientDomain(hotelId);

        if (!hotel) {
            return {
                message: 'Immposible create this client, the hotel does not registered',
            };
        }

        const client = await this.createClientPort.createClient(hotelId, dataClient);
        return client;
    }
}
