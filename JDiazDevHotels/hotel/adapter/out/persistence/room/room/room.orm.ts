import { Service } from "typedi";
import { RoomDatabaseEntity } from "./room-mysql.database-entity";
import { RoomRepository } from './room.repository';
import { LevelDatabaseEntity } from './../../level/level-mysql.database-entity';
import { RoomCategoryDatabaseEntity } from './../room-category/room-category-mysql.database-entity';
import { RoomConditionDatabaseEntity } from './../room-condition/room-condition-mysql.database-entity';

@Service()
export class RoomORM implements RoomRepository {
    async createRoom(roomData:any, hotelId:number):Promise<any>{
        const room = new RoomDatabaseEntity()
        room.name = roomData.name
        room.price = roomData.price
        room.details = roomData.details
        room.levelId = roomData.levelId
        room.categoryId = roomData.categoryId
        room.conditionId = roomData.conditionId
        room.state = true
        await room.save()
        return room
    }
    async updateRoom(roomData:any, roomId:number):Promise<any>{
        const room:any = await RoomDatabaseEntity.findByPk(roomId)
        room.name = roomData.name
        room.price = roomData.price
        room.details = roomData.details
        room.levelId = roomData.levelId
        room.categoryId = roomData.categoryId
        room.conditionId = roomData.conditionId
        await room.save()

        return room
    }
    async getRooms(levelId:number):Promise<any>{
        const rooms:any = RoomDatabaseEntity.findAll({
            where:{levelId:levelId},
            include:[
                { 
                    model:LevelDatabaseEntity, 
                    as:'level', 
                    attributes: {exclude:['createdAt', 'updatedAt', 'state'] }
                }, 
                { 
                    model:RoomCategoryDatabaseEntity, 
                    as:'category',
                    attributes: {exclude:['createdAt', 'updatedAt', 'state'] }
                }, 
                { 
                    model:RoomConditionDatabaseEntity, 
                    as:'condition',
                    attributes: {exclude:['createdAt', 'updatedAt', 'state'] }
                }
            ],
            attributes:{ exclude:[
                'levelId', 
                'categoryId', 
                'conditionId', 
                'createdAt', 
                'updatedAt',
                'state',            
            ]}
        })

        return rooms
    }
}