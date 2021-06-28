import { Service } from "typedi";
import { RoomRepository } from './room.repository';
import { RoomCategoryDatabaseEntity } from './room-category-mysql.database-entity';
import { RoomConditionDatabaseEntity } from './room-condition-mysql.database-entity';

@Service()
export class RoomCategoryORM implements RoomRepository{
    async saveRoomCategory(nameCategory:string, hotelId:number):Promise<any>{
        const roomCategory = new RoomCategoryDatabaseEntity()
        roomCategory.category = nameCategory
        roomCategory.hotelId = hotelId
        await roomCategory.save()

        return roomCategory
    }
    async saveRoomCondition(nameCondition:string):Promise<any>{
        const roomCondition = new RoomConditionDatabaseEntity()
        roomCondition.condition = nameCondition
        await roomCondition.save()

        return roomCondition
    }
}