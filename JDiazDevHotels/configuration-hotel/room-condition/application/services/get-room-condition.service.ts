import { Service } from "typedi";

import { GetRoomConditionPort } from '../ports/out/get-room-condition.port';
import { RoomConditionPersistenceAdapter } from '../../infraestructure/out/persistence/room-condition-persistence.adapter';
import { GetRoomConditionForRooomMiddelware } from "../../../room/infraestructure/in/web/interfaces/get-room-condition-for-room-middleware";

@Service()
export class GetRoomConditionService implements GetRoomConditionForRooomMiddelware {
    private getRoomConditionPort: GetRoomConditionPort

    constructor(roomConditionPersistenceAdapter: RoomConditionPersistenceAdapter) {
        this.getRoomConditionPort = roomConditionPersistenceAdapter
    }
    async getRoomConditionForRooomMiddleware(roomConditionId: number): Promise<any> {
        const roomCondition = await this.getRoomConditionPort.getRoomCondition(roomConditionId)
        return roomCondition
    }
}