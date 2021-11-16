import { Service } from 'typedi';
import { UpdateConditionOfRoomPort } from '../ports/out/self-domain/update-condition-of-room';
import { RoomPersistenceAdapter } from '../../adapters/out/persistence/room-persistence.adapter';
import { UpdateRoomCondtionRequest } from '../ports/in/update-room-condition.request';

@Service()
export class UpdateRoomConditionService implements UpdateRoomCondtionRequest {
    private updateConditionOfRoomPort: UpdateConditionOfRoomPort;

    constructor(roomPersistenceAdapter: RoomPersistenceAdapter) {
        this.updateConditionOfRoomPort = roomPersistenceAdapter;
    }
    async updateTheCondtionOfRoom(roomId: number, conditionId: number): Promise<any> {
        const room = await this.updateConditionOfRoomPort.updateRoomCondition(roomId, conditionId);
        return room;
    }
}
