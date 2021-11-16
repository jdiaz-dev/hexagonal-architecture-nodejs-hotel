import { ClientDomainEntity } from '../../../../domain/clients';

export interface GetClientModeledPort {
  getClientModeled(clientId: number): Promise<ClientDomainEntity>;
}
