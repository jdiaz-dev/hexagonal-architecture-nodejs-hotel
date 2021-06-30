import { Service } from "typedi";

import { GetRoomLevelService } from "../../../../hotel/levels/application/services/get-room-level.service";
import { RemoveTheRoomRequest } from '../ports/in/remove-the-room.request';
import { RoomCommand } from "../ports/in/room.command";
import { GetLevelForRoomDomain } from "../ports/out/other-domain/get-level-for-room-domain";
import { RemoveRoomPort } from '../ports/out/self-domain/remove-room.port';
import { RoomPersistenceAdapter } from './../../adapter/out/persistence/room-persistence.adapter';
import { GetRoomsPort } from './../ports/out/self-domain/get-rooms.port';
import { GetRoomModelToDomainPort } from './../ports/out/self-domain/get-room-modeled.ports';
import { RoomWithLevelCommand } from './../ports/in/room-with-level.domain';

@Service()
export class RemoveRoomService implements RemoveTheRoomRequest {
    //other domains     
    private getLevelForRoomDomain:GetLevelForRoomDomain  

    //self domain ports
    private removeRoomPort:RemoveRoomPort
    private getRoomModelToDomainPort:GetRoomModelToDomainPort
    
    
    constructor(
        //other domains 
        getRoomLevelService:GetRoomLevelService,
        
        //self domain ports
        roomPersistenceAdapter:RoomPersistenceAdapter
    ){
        //other domains 
        this.getLevelForRoomDomain = getRoomLevelService

        //self domain ports
        this.removeRoomPort = roomPersistenceAdapter
        this.getRoomModelToDomainPort = roomPersistenceAdapter
    }
    async removeTheRoom(
        levelId:number, 
        roomId:number, 
        command1:RoomCommand, 
        roomWithLevelCommand:RoomWithLevelCommand):Promise<any>{

        const roomDomain = await this.getLevelForRoomDomain.getLevelForRoomDomain(levelId)
        if( !roomDomain.checkIfRoomLevelBelognsToHotel(command1.getHotelId)){
            return { message: 'This level does not belongs to this hotel' }
        }

        const roomWithLevelDomain = await this.getRoomModelToDomainPort.getRoomModeledToDomain(roomId)
        if(! roomWithLevelDomain.checkIfRoomBelongsToLevel(roomWithLevelCommand.getLevelId)){
            return { message: 'This room does not belongs to this level'}
        }

        const roomRemoved = await this.removeRoomPort.removeRoom(roomId)
        if(!roomRemoved.state === false){
            return { message: 'An error has ocurred trying remove room'}
        }
        return { message: 'Room removed successly'}

    }
}