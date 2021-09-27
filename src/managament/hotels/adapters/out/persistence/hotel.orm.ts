import { Service } from 'typedi';
import { HotelModel } from './hotel.model';

import { HotelRepository } from './hotel.repository';

@Service()
export class HotelORM implements HotelRepository {
    async saveHotel(_hotel: HotelModel, userId: number): Promise<HotelModel> {
        const hotel = new HotelModel(_hotel);
        //const hotel = await HotelModel.create(_hotel)
        hotel.userId = userId;
        await hotel.save();

        return hotel;
    }
    async getHotel(hotelId: number): Promise<HotelModel | any> {
        const hotel = await HotelModel.findByPk(hotelId, {
            include: 'user',
            attributes: { exclude: ['userId'] },
        });

        if (!hotel) return null;
        return hotel.toJSON();
    }
    async findHotelByUserId(userId: number): Promise<any> {
        const hotel = await HotelModel.findOne({
            where: { userId: userId },
        });
        return hotel;
    }
}
