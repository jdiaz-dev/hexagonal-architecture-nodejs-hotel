import { Service } from "typedi";
import { CreateRoomConditionPort } from './../../port/out/room/create-room-condition.port';
import { RoomPersistenceAdapter } from './../../../adapter/out/persistence/room/room-persistence.adapter';
import { CreateNewRoomCondtionRequest } from "../../port/in/room/create-new-room-condition.request";

@Service()
export class CreateRoomConditionService implements CreateNewRoomCondtionRequest {
    private createRoomConditionPort:CreateRoomConditionPort
    
    constructor(roomPersistenceAdapter:RoomPersistenceAdapter){
        this.createRoomConditionPort = roomPersistenceAdapter
    }
    async createNewRoomCondition(nameCondition:string):Promise<any>{
        const newRoomCondition = await this.createRoomConditionPort.createRoomCondition(nameCondition)
        return newRoomCondition
    }
}

