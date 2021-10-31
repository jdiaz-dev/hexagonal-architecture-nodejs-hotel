import { IQueries } from '../../../../shared/interfaces/query.interface';

export interface GetClientsRequest {
    getTheClients(hotelId: number, queries: IQueries): Promise<any>;
}
