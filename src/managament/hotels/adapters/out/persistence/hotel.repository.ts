import { Hotel } from "./hotel.model";

export interface HotelRepository {
    saveHotel(data: any, userId: number): Promise<Hotel>
    getHotel(hotelId: number): Promise<Hotel | any>
    findHotelByUserId(userId: number): Promise<any>
}


