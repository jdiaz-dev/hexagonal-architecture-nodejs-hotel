import { Service } from "typedi";

import { RoomConditionDatabaseEntity } from "./room-condition-mysql.database-entity";
import { RoomConditionRepository } from './room-condition.repository';

@Service()
export class RoomConditionORM implements RoomConditionRepository{
    async saveRoomCondition(nameCondition:string):Promise<any>{
        const roomCondition = new RoomConditionDatabaseEntity()
        roomCondition.nameCondition = nameCondition
        await roomCondition.save()

        return roomCondition
    }
    async getRoomCondtion(roomConditionId:number):Promise<any>{
        const roomCondition = await RoomConditionDatabaseEntity.findByPk(roomConditionId)
        return roomCondition
    }
}