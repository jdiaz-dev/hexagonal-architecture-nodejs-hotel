import { Service } from "typedi";
import { CreateRoomConditionPort } from '../../../port/out/room/room-condition/create-room-condition.port';
import { CreateNewRoomCondtionRequest } from "../../../port/in/room/room-condition/create-new-room-condition.request";
import { RoomConditionPersistenceAdapter } from "../../../../adapter/out/persistence/room/room-condition/room-condition-persistence.adapter";

@Service()
export class CreateRoomConditionService implements CreateNewRoomCondtionRequest {
    private createRoomConditionPort:CreateRoomConditionPort
    
    constructor(roomConditionPersistenceAdapter:RoomConditionPersistenceAdapter){
        this.createRoomConditionPort = roomConditionPersistenceAdapter
    }
    async createNewRoomCondition(nameCondition:string):Promise<any>{
        const newRoomCondition = await this.createRoomConditionPort.createRoomCondition(nameCondition)
        return newRoomCondition
    }
}

