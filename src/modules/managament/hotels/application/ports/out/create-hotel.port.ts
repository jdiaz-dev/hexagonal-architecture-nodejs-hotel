import { HotelModel } from '../../../adapters/out/persistence/hotel.model';
import { HotelEntity } from '../../../domain/hotel';

export interface CreateHotelPort {
    createHotel(dataHotel: HotelEntity, userId: number): Promise<HotelModel>;
}
