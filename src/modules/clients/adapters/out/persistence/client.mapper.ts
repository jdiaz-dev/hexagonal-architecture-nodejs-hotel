import { Service } from 'typedi';
import { ClientDomainEntity } from '../../../domain/clients';
import { ClientDatabaseEntity } from './client-database-entity';

@Service()
export class ClientMapper {
  mapToDomainEntity(client: ClientDatabaseEntity) {
    return new ClientDomainEntity(client.hotelId);
  }
}
