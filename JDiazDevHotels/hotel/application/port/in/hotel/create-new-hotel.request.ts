import { CreateHotelCommand } from './create-hotel.command';
import { HotelDatabaseEntity } from '../../../../adapter/out/persistence/hotel/hotel-mysql.database-entity';

//include owner
export interface CreateNewHotelRequest {
    createNewHotel(command:CreateHotelCommand, clientId:any, id:number): Promise<HotelDatabaseEntity|any>
}