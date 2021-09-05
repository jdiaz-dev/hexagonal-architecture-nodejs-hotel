import { Service } from 'typedi'
import { Hotel } from './hotel.model';

import { HotelRepository } from './hotel.repository';

@Service()
export class HotelORM implements HotelRepository {
    async saveHotel(_hotel: Hotel, userId: number): Promise<Hotel> {
        const hotel = new Hotel(_hotel)
        //const hotel = await Hotel.create(_hotel)
        hotel.userId = userId
        await hotel.save()

        return hotel
    }
    async getHotel(hotelId: number): Promise<Hotel | any> {
        const hotel = await Hotel.findByPk(hotelId, {
            include: 'user',
            attributes: { exclude: ['userId'] }
        })

        if (!hotel) return null
        return hotel.toJSON()
    }
    async findHotelByUserId(userId: number): Promise<any> {
        const hotel = await Hotel.findOne({
            where: { userId: userId }
        })
        return hotel
    }
}
