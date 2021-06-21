import { Service } from 'typedi'
import { Hotel } from './hotel-mysql.database-entity';

import { HotelRepository } from './hotel.repository';

@Service()
export class HotelORM implements HotelRepository {
    async saveHotel(_hotel:Hotel):Promise<Hotel>{
        const hotel = new Hotel(_hotel)
        //const hotel = await Hotel.create(_hotel)
        await hotel.save() 
        return hotel
    }
}