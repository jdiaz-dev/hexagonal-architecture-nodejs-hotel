import { Service } from 'typedi';

import { RemoveTheRoomRequest } from '../ports/in/remove-the-room.request';
import { RoomCommand } from '../ports/in/room.command';
import { GetLevelForRoomDomainPort } from '../ports/out/other-domain/get-level-for-room-domain.port';
import { RemoveRoomPort } from '../ports/out/self-domain/remove-room.port';
import { RoomPersistenceAdapter } from '../../adapters/out/persistence/room-persistence.adapter';
import { GetRoomsPort } from '../ports/out/self-domain/get-rooms.port';
import { GetRoomModelForSelfDomainPort } from '../ports/out/self-domain/get-room-modeled.ports';
import { RoomWithLevelCommand } from '../ports/in/room-with-level.domain';
import { RoomWithLevelEntity } from '../../domain/room-with-level';
import { RoomDomain } from '../../domain/room';
import { LevelPersistenceAdpater } from '../../../levels/adapters/out/persistence/level-persistence.adapter';

@Service()
export class RemoveRoomService implements RemoveTheRoomRequest {
    //other domains
    private getLevelForRoomDomainPort: GetLevelForRoomDomainPort;

    //self domain ports
    private removeRoomPort: RemoveRoomPort;
    private getRoomModelForSelfDomainPort: GetRoomModelForSelfDomainPort;

    constructor(
        //other domains
        levelPersistenceAdpater: LevelPersistenceAdpater,

        //self domain ports
        roomPersistenceAdapter: RoomPersistenceAdapter,
    ) {
        //other domains
        this.getLevelForRoomDomainPort = levelPersistenceAdpater;

        //self domain ports
        this.removeRoomPort = roomPersistenceAdapter;
        this.getRoomModelForSelfDomainPort = roomPersistenceAdapter;
    }
    async removeTheRoom(
        levelId: number,
        roomId: number,
        command1: RoomCommand,
        roomWithLevelCommand: RoomWithLevelCommand,
    ): Promise<any> {
        const roomDomain: RoomDomain = await this.getLevelForRoomDomainPort.getLevelForRoomDomain(levelId);
        if (!roomDomain.checkIfRoomLevelBelognsToHotel(command1.getHotelId)) {
            return { message: 'This level does not belongs to this hotel' };
        }

        const roomWithLevelDomain: RoomWithLevelEntity =
            await this.getRoomModelForSelfDomainPort.getRoomForSelfDomain(roomId);
        if (!roomWithLevelDomain.checkIfRoomBelongsToLevel(roomWithLevelCommand.getLevelId)) {
            return { message: 'This room does not belongs to this level' };
        }

        const roomRemoved = await this.removeRoomPort.removeRoom(roomId);
        if (!roomRemoved.state === false) {
            return { message: 'An error has ocurred trying remove room' };
        }
        return { message: 'Room removed successly' };
    }
}
