import { CreateHotelCommand } from './create-hotel.command';
import { HotelDatabaseEntity } from '../../../adapters/out/persistence/hotel-mysql.database-entity';

//include owner
export interface CreateNewHotelRequest {
    createNewHotel(command:CreateHotelCommand, clientId:any, id:number): Promise<HotelDatabaseEntity|any>
}