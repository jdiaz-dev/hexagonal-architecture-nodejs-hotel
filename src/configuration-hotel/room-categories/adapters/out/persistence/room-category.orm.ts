import { Service } from "typedi";
import { RoomCategory } from "./room-category.model";
import { RoomCategoryRepository } from './room-category.repository';

@Service()
export class RoomCategoryORM implements RoomCategoryRepository {
    async saveRoomCategory(nameCategory: string, price: number, hotelId: number): Promise<any> {
        try {
            const roomCategory = new RoomCategory()
            roomCategory.category = nameCategory
            roomCategory.price = price
            roomCategory.hotelId = hotelId
            await roomCategory.save()

            return roomCategory
        } catch (error) {
            console.log('-----------------', error)
        }
    }
    async getRoomCategory(roomCategoryId: number): Promise<any> {
        try {
            const roomCategory = await RoomCategory.findByPk(roomCategoryId)
            return roomCategory
        } catch (error) {
            console.log('-----------------', error)
        }
    }
    async getRoomCategories(hotelId: number): Promise<any> {
        try {
            const roomCategories = await RoomCategory.findAll({
                where: { hotelId: hotelId, state: true },
                attributes: ['id', 'category', 'price'],
                order: [['price', 'ASC']]
            })
            return roomCategories
        } catch (error) {
            console.log('-----------------', error)
        }
    }
    async updateCategoryRoom(nameCategory: string, price: number, roomCategoryId: number): Promise<any> {
        try {
            const roomCategory: any = await RoomCategory.findByPk(roomCategoryId)
            roomCategory.category = nameCategory
            roomCategory.price = price
            await roomCategory.save()

            return roomCategory
        } catch (error) {
            console.log('-----------------', error)
        }
    }
    async removeRoomCategory(roomCategoryId: number): Promise<any> {
        try {
            const roomCategory: any = await RoomCategory.findByPk(roomCategoryId)
            roomCategory.state = false
            await roomCategory.save()

            return roomCategory

        } catch (error) {
            console.log('-----------------', error)
        }
    }
}