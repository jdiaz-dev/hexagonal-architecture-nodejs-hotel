import { IQueries } from '../../../../../../shared/interfaces/query.interface';

export interface GetHotelLevelsRequest {
    getLevelsOfHotel(hotelId: number, queries: IQueries): Promise<any>;
}
