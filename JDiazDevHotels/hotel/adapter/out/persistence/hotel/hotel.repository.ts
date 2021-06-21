import { Hotel } from "./hotel-mysql.database-entity";

export interface HotelRepository {
    saveHotel(data:any):Promise<Hotel>   
}


