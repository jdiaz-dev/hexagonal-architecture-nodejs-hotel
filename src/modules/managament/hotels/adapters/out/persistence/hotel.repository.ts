import { HotelModel } from './hotel.model';

export interface HotelRepository {
    saveHotel(data: any, userId: number): Promise<HotelModel>;
    getHotel(hotelId: number): Promise<HotelModel | any>;
    findHotelByUserId(userId: number): Promise<any>;
}
