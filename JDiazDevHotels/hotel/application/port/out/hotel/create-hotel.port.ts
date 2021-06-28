import { HotelDatabaseEntity } from '../../../../adapter/out/persistence/hotel/hotel-mysql.database-entity';
import { HotelEntity } from '../../../../domain/hotel';

export interface CreateHotelPort {
    createHotel(dataHotel:HotelEntity, userId:number):Promise<HotelDatabaseEntity>
}


