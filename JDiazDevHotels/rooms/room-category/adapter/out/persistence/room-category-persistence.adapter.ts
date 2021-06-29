import { Service } from "typedi";
import { RoomCategoryORM } from './room-category.orm';
import { CreateRoomCategoryPort } from "../../../application/ports/out/create-room-category.port";
import { GetRoomCategoryPort } from "../../../application/ports/out/get-room-category.port";
import { RoomCategoryRepository } from './room-category.repository';

@Service()
export class RoomCategoryPersistenceAdapter implements 
        CreateRoomCategoryPort,
        GetRoomCategoryPort {
    private roomCategoryRepository:RoomCategoryRepository
    
    constructor(roomCategoryORM:RoomCategoryORM){
        this.roomCategoryRepository = roomCategoryORM
    }
    //room category
    async createRoomCategory(nameCategory:string, hotelId:number):Promise<any>{
        const roomCategory = await this.roomCategoryRepository.saveRoomCategory(nameCategory, hotelId)
        return roomCategory
    }
    async getRoomCategory(roomCategoryId:number):Promise<any>{
        const roomCategory = await this.roomCategoryRepository.getRoomCategory(roomCategoryId)
        return roomCategory
    }

    
}