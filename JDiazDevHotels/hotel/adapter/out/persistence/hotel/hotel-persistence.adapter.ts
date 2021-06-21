import { Service } from 'typedi'

import { CreateHotelPort } from '../../../../application/port/out/create-hotel.port';
import { HotelEntity } from '../../../../domain/hotel';
import { Hotel } from './hotel-mysql.database-entity';
import { HotelORM } from './hotel.orm';
import { HotelRepository } from './hotel.repository';

@Service()
export class HotelPersistenceAdapter implements CreateHotelPort {
    private hotelRepository: HotelRepository

    constructor(hotelORM:HotelORM){
        this.hotelRepository = hotelORM
    }
    async createHotel(dataHotel:HotelEntity):Promise<Hotel>{

        const hotel = {
            name:dataHotel.name,
            address:dataHotel.address
        }

        const hotelCreated = await this.hotelRepository.saveHotel(hotel)
        return hotelCreated
    }
    createRole(){
        
    }
    createUser(){

    }
    
}