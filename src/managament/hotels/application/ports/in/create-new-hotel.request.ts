import { CreateHotelCommand } from './create-hotel.command';
import { HotelModel } from '../../../adapters/out/persistence/hotel.model';

//include owner
export interface CreateNewHotelRequest {
    createNewHotel(command: CreateHotelCommand, clientId: any, id: number): Promise<HotelModel | any>;
}
