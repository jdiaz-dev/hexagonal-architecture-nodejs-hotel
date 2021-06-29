import { Service } from "typedi";
import { RoomCategoryDatabaseEntity } from "./room-category-mysql.database-entity";
import { RoomCategoryRepository } from './room-category.repository';

@Service()
export class RoomCategoryORM implements RoomCategoryRepository{
    async saveRoomCategory(nameCategory:string, hotelId:number):Promise<any>{
        const roomCategory = new RoomCategoryDatabaseEntity()
        roomCategory.category = nameCategory
        roomCategory.hotelId = hotelId
        await roomCategory.save()

        return roomCategory
    }
    async getRoomCategory(roomCategoryId:number):Promise<any>{
        const roomCategory = RoomCategoryDatabaseEntity.findByPk(roomCategoryId)
        return roomCategory
    }
    
}