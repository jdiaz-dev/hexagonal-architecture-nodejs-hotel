import { Service } from "typedi";
import { RoomCategoryDatabaseEntity } from "./room-category-mysql.database-entity";
import { RoomCategoryRepository } from './room-category.repository';

@Service()
export class RoomCategoryORM implements RoomCategoryRepository {
    async saveRoomCategory(nameCategory: string, hotelId: number): Promise<any> {
        try {
            const roomCategory = new RoomCategoryDatabaseEntity()
            roomCategory.category = nameCategory
            roomCategory.hotelId = hotelId
            await roomCategory.save()

            return roomCategory
        } catch (error) {
            console.log('-----------------', error)
        }
    }
    async getRoomCategory(roomCategoryId: number): Promise<any> {
        try {
            const roomCategory = await RoomCategoryDatabaseEntity.findByPk(roomCategoryId)
            return roomCategory
        } catch (error) {
            console.log('-----------------', error)
        }
    }
    async getRoomCategories(hotelId: number): Promise<any> {
        try {
            const roomCategories = await RoomCategoryDatabaseEntity.findAll({
                where: { hotelId: hotelId, state: true },
                attributes: ['id', 'category']
            })
            return roomCategories
        } catch (error) {
            console.log('-----------------', error)
        }
    }
    async updateCategoryRoom(nameCategory: string, roomCategoryId: number): Promise<any> {
        try {
            const roomCategory: any = await RoomCategoryDatabaseEntity.findByPk(roomCategoryId)
            roomCategory.category = nameCategory
            await roomCategory.save()

            return roomCategory
        } catch (error) {
            console.log('-----------------', error)
        }
    }
    async removeRoomCategory(roomCategoryId: number): Promise<any> {
        try {
            const roomCategory: any = await RoomCategoryDatabaseEntity.findByPk(roomCategoryId)
            roomCategory.state = false
            await roomCategory.save()

            return roomCategory

        } catch (error) {
            console.log('-----------------', error)
        }
    }
}