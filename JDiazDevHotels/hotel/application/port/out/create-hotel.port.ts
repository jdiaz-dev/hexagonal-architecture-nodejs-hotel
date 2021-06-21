import { Hotel } from '../../../adapter/out/persistence/hotel/hotel-mysql.database-entity';
import { HotelEntity } from './../../../domain/hotel';

export interface CreateHotelPort {
    createHotel(dataHotel:HotelEntity):Promise<Hotel>
}


