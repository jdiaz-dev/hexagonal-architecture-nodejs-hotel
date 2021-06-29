import { Service } from "typedi";

import { CreateNewRoomRequest } from '../ports/in/create-new-room.request';
import { CreateNewRoomCommand } from '../ports/in/create-new-room.command';
import { GetHotelLevelsPort } from '../../../../hotel/levels/application/ports/out/get-hotel-levels.port';
import { GetRoomCategoryPort } from '../../../room-category/application/ports/out/get-room-category.port';
import { GetRoomConditionPort } from '../../../room-condition/application/ports/out/get-room-condition.port';

import { RoomConditionPersistenceAdapter } from '../../../room-condition/adapter/out/persistence/room-condition-persistence.adapter';
import { LevelPersistenceAdpater } from '../../../../hotel/levels/adapter/out/persistence/level-persistence.adapter';
import { RoomCategoryPersistenceAdapter } from "../../../room-category/adapter/out/persistence/room-category-persistence.adapter";
import { CreateRoomPort } from '../ports/out/create-room.port';
import { RoomPersistenceAdapter } from '../../adapter/out/persistence/room-persistence.adapter';
import { UpdateTheRoomRequest } from '../ports/in/update-the-room-request';
import { UpdateRoomPort } from '../ports/out/update-room.port';

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

