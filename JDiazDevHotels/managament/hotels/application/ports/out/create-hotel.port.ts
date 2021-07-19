import { HotelDatabaseEntity } from '../../../infraestucture/out/persistence/hotel-mysql.database-entity';
import { HotelEntity } from '../../../domain/hotel';

export interface CreateHotelPort {
    createHotel(dataHotel: HotelEntity, userId: number): Promise<HotelDatabaseEntity>
}


