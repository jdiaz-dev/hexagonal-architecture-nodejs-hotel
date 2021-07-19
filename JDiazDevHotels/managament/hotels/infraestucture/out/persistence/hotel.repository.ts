import { HotelDatabaseEntity } from "./hotel-mysql.database-entity";

export interface HotelRepository {
    saveHotel(data: any, userId: number): Promise<HotelDatabaseEntity>
    getHotel(hotelId: number): Promise<HotelDatabaseEntity | any>
    findHotelByUserId(userId: number): Promise<any>
}


