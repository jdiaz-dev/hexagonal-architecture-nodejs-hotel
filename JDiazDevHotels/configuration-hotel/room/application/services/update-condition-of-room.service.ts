import { Service } from "typedi";
import { UpdateConditionOfRoomPort } from '../ports/out/self-domain/update-condition-of-room';
import { RoomPersistenceAdapter } from '../../adapter/out/persistence/room-persistence.adapter';
import { UpdateConditionFromHoustingDomain } from '../../../../housting/application/ports/out/other-domain/update-condition-of-room-from-housting-domain';
import { UpdateCondtionOfRoomRequest } from "../ports/in/update-condition-of-room.request";

@Service()
export class UpdateConditionOfRoomService implements
    UpdateCondtionOfRoomRequest,
    UpdateConditionFromHoustingDomain {
    private updateConditionOfRoomPort: UpdateConditionOfRoomPort

    constructor(roomPersistenceAdapter: RoomPersistenceAdapter) {
        this.updateConditionOfRoomPort = roomPersistenceAdapter
    }
    async updateTheCondtionOfRoom(roomId: number, conditionId: number): Promise<any> {
        const room = await this.updateConditionOfRoomPort.updateConditionOfRoom(roomId, conditionId)
        return room
    }
    async updateFromHoustingDomain(roomId: number, conditionId: number): Promise<any> {
        const room = await this.updateConditionOfRoomPort.updateConditionOfRoom(roomId, conditionId)
        return room
    }

}


