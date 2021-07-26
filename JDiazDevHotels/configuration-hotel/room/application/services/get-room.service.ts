import { Service } from "typedi";
import { RoomPersistenceAdapter } from "../../infraestructure/out/persistence/room-persistence.adapter";

import { GetRoomForHoustingDomain } from '../../../../housting/application/ports/out/other-domain/get-room-for-housting-domain';
import { GetRoomPort } from '../ports/out/self-domain/get-room.port';

@Service()
export class GetRoomService implements GetRoomForHoustingDomain {
    private getRoomPort: GetRoomPort

    constructor(
        //other domains

        //self domain ports
        roomPersistenceAdapter: RoomPersistenceAdapter,
    ) {
        //other domains

        //self domain ports
        this.getRoomPort = roomPersistenceAdapter
    }
    async getRoomForHoustingDomain(roomId: number): Promise<any> {
        const room = await this.getRoomPort.getRoom(roomId)
        return room
    }

}