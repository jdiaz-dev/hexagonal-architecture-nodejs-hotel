import { Service } from "typedi";

import { CreateNewRoomRequest } from '../../../port/in/room/room/create-new-room.request';
import { CreateNewRoomCommand } from '../../../port/in/room/room/create-new-room.command';
import { GetHotelLevelsPort } from '../../../port/out/level/get-hotel-levels.port';
import { GetRoomCategoryPort } from '../../../port/out/room/room-category/get-room-category.port';
import { GetRoomConditionPort } from './../../../port/out/room/room-condition/get-room-condition.port';

import { RoomConditionPersistenceAdapter } from './../../../../adapter/out/persistence/room/room-condition/room-condition-persistence.adapter';
import { LevelPersistenceAdpater } from './../../../../adapter/out/persistence/level/level-persistence.adapter';
import { RoomCategoryPersistenceAdapter } from "../../../../adapter/out/persistence/room/room-category/room-category-persistence.adapter";
import { CreateRoomPort } from './../../../port/out/room/room/create-room.port';
import { RoomPersistenceAdapter } from './../../../../adapter/out/persistence/room/room/room-persistence.adapter';
import { UpdateTheRoomRequest } from './../../../port/in/room/room/update-the-room-request';
import { UpdateRoomPort } from './../../../port/out/room/room/update-room.port';

@Service()
export class CreateAndUpdateRoomService implements 
        CreateNewRoomRequest,
        UpdateTheRoomRequest {
    private getHotelLevelsPort:GetHotelLevelsPort
    private getRoomCategoryPort:GetRoomCategoryPort
    private getRoomConditionPort:GetRoomConditionPort
    private createRoomPort:CreateRoomPort
    private updateRoomPort:UpdateRoomPort
    
    constructor(
        levelPersistenceAdpater:LevelPersistenceAdpater,
        roomCategoryPersistenceAdapter:RoomCategoryPersistenceAdapter,
        roomConditionPersistenceAdapter:RoomConditionPersistenceAdapter,
        roomPersistenceAdapter:RoomPersistenceAdapter
    ){
        this.getHotelLevelsPort = levelPersistenceAdpater
        this.getRoomCategoryPort = roomCategoryPersistenceAdapter
        this.getRoomConditionPort = roomConditionPersistenceAdapter
        this.createRoomPort = roomPersistenceAdapter
        this.updateRoomPort = roomPersistenceAdapter
    }

    async createNewRoom(command:CreateNewRoomCommand):Promise<any>{
        const newRoom = await this.saveDataRoom(command, 'create')  
        return newRoom 
    }
    async updateTheRoom(command:CreateNewRoomCommand):Promise<any>{
        const roomUpdated = await this.saveDataRoom(command, 'update')
        return roomUpdated
    }
    async saveDataRoom(command:CreateNewRoomCommand, action:string):Promise<any>{

        console.log('---------------------------the action', action)
        const roomLevel = await this.getHotelLevelsPort.getLevel(command.getRoomEntity.getRoomData.getLevelId)
        const roomCategory = await this.getRoomCategoryPort.getRoomCategory(command.getRoomEntity.getRoomData.getCategoryId)
        const roomCondition = await this.getRoomConditionPort.getRoomCondtion(command.getRoomEntity.getRoomData.getConditionId)
        
        if( ! command.getRoomEntity.checkIfRoomLevelBelognsToHotel(roomLevel.hotelId) ){
            return { message: 'This level does not belongs to this hotel '}
        }

        if( ! command.getRoomEntity.checkIfRoomCategoryBelongsToHotel(roomCategory.hotelId) ){
            return { message: 'This category does not belongs to this hotel '}
        }

        if( !command.getRoomEntity.checkIfExistsRoomCondition(roomCondition) ){
            return { message: 'This category room condition does not exists '}
        }

        let room
        if(action === 'create'){
            const newRoom = await this.createRoomPort.createRoom(command.getRoomEntity.getRoomData, command.getRoomEntity.getHoteId)
            room = newRoom

        }else if(action === 'update'){
            const roomUpdated = await this.updateRoomPort.updateRoom(command.getRoomEntity.getRoomData, command.getRoomEntity.getRoomData.getRoomId)
            room = roomUpdated
        }
            
        return room
    }

}

