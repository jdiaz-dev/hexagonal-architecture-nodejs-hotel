import { Service } from "typedi";

import { RoomDomainEntity } from "../../../room/domain/room";
import { GetRoomCategoryForRoomDomain } from './../../../room/application/ports/out/other-domain/get-room-category-for-room-domain';
import { GetRoomCategoryPort } from '../ports/out/self-domain/get-room-category.port';
import { RoomCategoryPersistenceAdapter } from './../../adapter/out/persistence/room-category-persistence.adapter';

@Service()
export class GetRoomCategoryService implements GetRoomCategoryForRoomDomain {
    private getRoomCategoryPort:GetRoomCategoryPort

    constructor(roomCategoryPersistenceAdapter:RoomCategoryPersistenceAdapter){
        this.getRoomCategoryPort = roomCategoryPersistenceAdapter
    }
    async getRoomCategoryForRoomDomain(roomCategoryId:number):Promise<RoomDomainEntity>{
        const roomCategory = await this.getRoomCategoryPort.getRoomCategory(roomCategoryId)
        console.log('------------------the room category', roomCategory)
        return new RoomDomainEntity(roomCategory.hotelId)
    }
}