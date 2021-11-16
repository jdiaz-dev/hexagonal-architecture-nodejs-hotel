import { IQueries } from '../../../../../../shared/interfaces/query.interface';

export interface GetClientsPort {
    getClients(hotelId: number, queries: IQueries): Promise<any>;
}
