import { Service } from 'typedi'

import { CreateHotelPort } from '../port/out/create-hotel.port';
import { CreateHotelCommand } from './../port/in/create-hotel.command';
import { CreateNewHotelUseCase } from '../port/in/create-new-hotel.use-case';
import { HotelPersistenceAdapter } from '../../adapter/out/persistence/hotel/hotel-persistence.adapter';
import { Hotel } from '../../adapter/out/persistence/hotel/hotel-mysql.database-entity';



@Service()
export class CreateHotelService implements CreateNewHotelUseCase {
    private createHotelPort:CreateHotelPort

    constructor(hotelPersistenceAdapter:HotelPersistenceAdapter){
        this.createHotelPort = hotelPersistenceAdapter
    }
    async createNewHotel(command:CreateHotelCommand):Promise<Hotel>{
        const hotel = command.getHotel
        
        const hotelCreaded = await this.createHotelPort.createHotel(hotel)
        return hotelCreaded
    }

}


