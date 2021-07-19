import { Service } from 'typedi'
import { HotelDatabaseEntity } from './hotel-mysql.database-entity';

import { HotelRepository } from './hotel.repository';

@Service()
export class HotelORM implements HotelRepository {
    async saveHotel(_hotel: HotelDatabaseEntity, userId: number): Promise<HotelDatabaseEntity> {
        const hotel = new HotelDatabaseEntity(_hotel)
        //const hotel = await Hotel.create(_hotel)
        hotel.userId = userId
        await hotel.save()

        return hotel
    }
    async getHotel(hotelId: number): Promise<HotelDatabaseEntity | any> {
        const hotel = await HotelDatabaseEntity.findByPk(hotelId, {
            include: 'user',
            attributes: { exclude: ['userId'] }
        })

        if (!hotel) return null
        return hotel.toJSON()
    }
    async findHotelByUserId(userId: number): Promise<any> {
        const hotel = await HotelDatabaseEntity.findOne({
            where: { userId: userId }
        })
        return hotel
    }
}
