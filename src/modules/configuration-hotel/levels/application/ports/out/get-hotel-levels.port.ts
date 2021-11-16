import { IQueries } from '../../../../../../shared/interfaces/query.interface';

export interface GetHotelLevelsPort {
    getLevels(hotelId: number, queries: IQueries): Promise<any>;
}
