import { Service } from 'typedi';

import { GetRoomsRequest } from '../ports/in/get-rooms.request';
import { GetRoomsPort } from '../ports/out/self-domain/get-rooms.port';
import { RoomPersistenceAdapter } from '../../adapters/out/persistence/room-persistence.adapter';
import { RoomCommand } from '../ports/in/room.command';

import { GetLevelForRoomDomainPort } from '../ports/out/other-domain/get-level-for-room-domain.port';
import { GetRoomCategoryForRoomDomainPort } from '../ports/out/other-domain/get-room-category-for-room-domain.port';
import { RoomDomain } from '../../domain/room';
import { LevelPersistenceAdpater } from '../../../levels/adapters/out/persistence/level-persistence.adapter';
import { RoomCategoryPersistenceAdapter } from '../../../room-categories/adapters/out/persistence/room-category-persistence.adapter';

@Service()
export class GetRoomsService implements GetRoomsRequest {
    //other domains
    private getLevelForRoomDomainPort: GetLevelForRoomDomainPort;
    private getRoomCategoryForRoomDomainPort: GetRoomCategoryForRoomDomainPort;

    //self domain ports
    private getRoomsPort: GetRoomsPort;

    constructor(
        //other domains
        levelPersistenceAdpater: LevelPersistenceAdpater,
        roomCategoryPersistenceAdapter: RoomCategoryPersistenceAdapter,

        //self domain ports
        roomPersistenceAdapter: RoomPersistenceAdapter,
    ) {
        //other domains
        this.getLevelForRoomDomainPort = levelPersistenceAdpater;
        this.getRoomCategoryForRoomDomainPort = roomCategoryPersistenceAdapter;

        //self domain ports
        this.getRoomsPort = roomPersistenceAdapter;
    }
    async getRoomsByLevel(levelId: number, roomConditionId: number, command: RoomCommand): Promise<any> {
        const roomDomain: RoomDomain = await this.getLevelForRoomDomainPort.getLevelForRoomDomain(levelId);

        if (!roomDomain.checkIfRoomLevelBelognsToHotel(command.getHotelId)) {
            return { message: 'This level does not belongs to this hotel' };
        }

        const rooms = await this.getRoomsPort.getRoomsByLevel(levelId, roomConditionId);
        return rooms;
    }
    async getAllRooms(hotelId: number): Promise<any> {
        const rooms = await this.getRoomsPort.getAllRooms(hotelId);
        return rooms;
    }
}
