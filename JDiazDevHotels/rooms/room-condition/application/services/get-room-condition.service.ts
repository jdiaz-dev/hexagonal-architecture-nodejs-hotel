import { Service } from "typedi";
import { GetRoomConditionForRoomDomain } from './../../../room/application/ports/out/other-domain/get-room-condition-for-room-domain';
import { GetRoomConditionPort } from './../ports/out/get-room-condition.port';
import { RoomConditionPersistenceAdapter } from './../../adapter/out/persistence/room-condition-persistence.adapter';

@Service()
export class GetRoomConditionService implements GetRoomConditionForRoomDomain {
    private getRoomConditionPort:GetRoomConditionPort

    constructor(roomConditionPersistenceAdapter:RoomConditionPersistenceAdapter){
        this.getRoomConditionPort = roomConditionPersistenceAdapter 
    }
    async getRoomConditionForRoomDomain(roomConditionId:number):Promise<any>{
        const roomCondition = this.getRoomConditionPort.getRoomCondition(roomConditionId)
        return roomCondition
    }
}