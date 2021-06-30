import { Service } from "typedi";

import { GetRoomsRequest } from '../ports/in/get-rooms.request';
import { GetRoomsPort } from '../ports/out/self-domain/get-rooms.port';
import { RoomPersistenceAdapter } from '../../adapter/out/persistence/room-persistence.adapter';
import { RoomCommand } from "../ports/in/room.command";

import { GetLevelForRoomDomain } from "../ports/out/other-domain/get-level-for-room-domain";
import { GetRoomLevelService } from "../../../../hotel/levels/application/services/get-room-level.service";
import { GetRoomCategoryForRoomDomain } from './../ports/out/other-domain/get-room-category-for-room-domain';
import { GetRoomCategoryService } from './../../../room-category/application/services/get-room-category.service';

@Service()
export class GetRoomsService implements GetRoomsRequest {

    //other domains
    private getLevelForRoomDomain:GetLevelForRoomDomain    
    private getRoomCategoryForRoomDomain:GetRoomCategoryForRoomDomain

    //self domain ports
    private getRoomsPort:GetRoomsPort
    
    constructor(
        //other domains
        getRoomLevelService:GetRoomLevelService,
        getRoomCategoryService:GetRoomCategoryService,

        //self domain ports
        roomPersistenceAdapter:RoomPersistenceAdapter,
    ){
        //other domains
        this.getLevelForRoomDomain = getRoomLevelService
        this.getRoomCategoryForRoomDomain = getRoomCategoryService

        //self domain ports
        this.getRoomsPort = roomPersistenceAdapter
    }
    async getRoomsOfLevel(levelId:number, command:RoomCommand):Promise<any>{
        const roomDomain = await this.getLevelForRoomDomain.getLevelForRoomDomain(levelId)

        if( ! roomDomain.checkIfRoomLevelBelognsToHotel(command.getHotelId) ){
            return { message: 'This level does not belongs to this hotel' }
        }

        const rooms = await this.getRoomsPort.getRooms(levelId)
        return rooms
    }
}