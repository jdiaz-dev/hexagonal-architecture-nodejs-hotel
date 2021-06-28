import { Service } from "typedi";

import { RoomRepository } from './room.repository';
import { RoomCategoryORM } from './room.orm';
import { CreateRoomCategoryPort } from "../../../../application/port/out/room/create-room-category.port";
import { CreateRoomConditionPort } from './../../../../application/port/out/room/create-room-condition.port';

@Service()
export class RoomPersistenceAdapter implements 
        CreateRoomCategoryPort, 
        CreateRoomConditionPort{
    private roomRepository:RoomRepository
    
    constructor(roomCategoryORM:RoomCategoryORM){
        this.roomRepository = roomCategoryORM
    }
    async createRoomCategory(nameCategory:string, hotelId:number):Promise<any>{
        const roomCategory = await this.roomRepository.saveRoomCategory(nameCategory, hotelId)
        return roomCategory
    }
    async createRoomCondition(nameCondition:string):Promise<any>{
        const roomCondtion = await this.roomRepository.saveRoomCondition(nameCondition)
        return roomCondtion
    }
}