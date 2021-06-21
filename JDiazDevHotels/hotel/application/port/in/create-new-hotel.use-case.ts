import { CreateHotelCommand } from './create-hotel.command';
import { Hotel } from '../../../adapter/out/persistence/hotel/hotel-mysql.database-entity';

export interface CreateNewHotelUseCase {
    createNewHotel(command:CreateHotelCommand): Promise<Hotel>
}