import { Service } from "typedi";

import { CreateRoomConditionPort } from "../../../application/ports/out/create-room-condition.port";
import { RoomConditionRepository } from './room-condition.repository';
import { RoomConditionORM } from './room-condition.orm';
import { GetRoomConditionPort } from "../../../application/ports/out/get-room-condition.port";

@Service()
export class RoomConditionPersistenceAdapter implements 
        CreateRoomConditionPort,
        GetRoomConditionPort {
    private roomConditionRepository:RoomConditionRepository
    constructor(
        roomConditionORM:RoomConditionORM
    ){
        this.roomConditionRepository = roomConditionORM
    }
    //room condition
    async createRoomCondition(nameCondition:string):Promise<any>{
        const roomCondtion = await this.roomConditionRepository.saveRoomCondition(nameCondition)
        return roomCondtion
    }
    async getRoomCondtion(roomConditionId:number):Promise<any>{
        const roomCondition = await this.roomConditionRepository.getRoomCondtion(roomConditionId)
        return roomCondition
    }
}