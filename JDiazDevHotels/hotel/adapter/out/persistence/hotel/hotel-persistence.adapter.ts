import { Service } from 'typedi'

import { CreateHotelPort } from '../../../../application/port/out/hotel/create-hotel.port';
import { GetHotelPort } from '../../../../application/port/out/hotel/get-hotel.port';
import { HotelEntity } from '../../../../domain/hotel';
import { HotelDatabaseEntity } from './hotel-mysql.database-entity';
import { HotelORM } from './hotel.orm';
import { HotelRepository } from './hotel.repository';

@Service()
export class HotelPersistenceAdapter implements 
        CreateHotelPort,
        GetHotelPort {
    private hotelRepository: HotelRepository

    constructor(hotelORM:HotelORM){
        this.hotelRepository = hotelORM
    }
    async createHotel(dataHotel:HotelEntity, userId:number):Promise<HotelDatabaseEntity>{

        const hotel = {
            name:dataHotel.name,
            address:dataHotel.address
        }

        const hotelCreated = await this.hotelRepository.saveHotel(hotel, userId)
        return hotelCreated
    }
    async findHotel(hotelId:number):Promise<any>{
        const hotel = await this.hotelRepository.getHotel(hotelId)
        return hotel
    }
    
}