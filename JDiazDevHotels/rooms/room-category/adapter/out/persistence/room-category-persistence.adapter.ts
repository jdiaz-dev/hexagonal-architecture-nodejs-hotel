import { Service } from "typedi";
import { RoomCategoryORM } from './room-category.orm';
import { CreateRoomCategoryPort } from "../../../application/ports/out/self-domain/create-room-category.port";
import { GetRoomCategoryPort } from "../../../application/ports/out/self-domain/get-room-category.port";
import { RoomCategoryRepository } from './room-category.repository';
import { GetRoomCategoriesPort } from '../../../application/ports/out/self-domain/get-room-categories.port';
import { GetRoomCategoryModeledPort } from '../../../application/ports/out/self-domain/get-room-category-modeled.port';
import { UpdateRoomCategoryPort } from "../../../application/ports/out/self-domain/update-room-category.port";
import { RoomCategoryDomainEntity } from './../../../domain/room-category';
import { RemoveRoomCategoryPort } from './../../../application/ports/out/self-domain/remove-room-categoy.port';


@Service()
export class RoomCategoryPersistenceAdapter implements 
        CreateRoomCategoryPort,
        GetRoomCategoryPort,
        GetRoomCategoriesPort,
        GetRoomCategoryModeledPort,
        UpdateRoomCategoryPort,
        RemoveRoomCategoryPort {
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
    async getRoomCategories(hotelId:number):Promise<any>{
        const roomCategories = await this.roomCategoryRepository.getRoomCategories(hotelId)
        return roomCategories
    }
    async getRoomCategoryModeledPort(roomCategoryId:number):Promise<any>{
        const roomCategory = await this.roomCategoryRepository.getRoomCategory(roomCategoryId)
        return new RoomCategoryDomainEntity(roomCategory.hotelId)
    }
    async updateCategoryRoom(nameCategory:string, roomCategoryId:number):Promise<any>{
        const roomCategory = await this.roomCategoryRepository.updateCategoryRoom(nameCategory, roomCategoryId)
        return roomCategory
    }
    async removeRoomCategory(roomCategoryId:number):Promise<any>{
        const roomCategory = await this.roomCategoryRepository.removeRoomCategory(roomCategoryId)
        return roomCategory
    }
    
}