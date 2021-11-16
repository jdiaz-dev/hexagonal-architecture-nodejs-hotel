import { Service } from 'typedi';

import { CreateNewRoomRequest } from '../ports/in/create-new-room.request';
import { RoomCommand } from '../ports/in/room.command';
import { CreateRoomPort } from '../ports/out/self-domain/create-room.port';
import { RoomPersistenceAdapter } from '../../adapters/out/persistence/room-persistence.adapter';
import { UpdateTheRoomRequest } from '../ports/in/update-the-room-request';
import { UpdateRoomPort } from '../ports/out/self-domain/update-room.port';
import { RoomData } from './room-data';
import { GetLevelForRoomDomainPort } from '../ports/out/other-domain/get-level-for-room-domain.port';
import { GetRoomCategoryForRoomDomainPort } from '../ports/out/other-domain/get-room-category-for-room-domain.port';
import { RoomDomain } from '../../domain/room';
import { LevelPersistenceAdpater } from '../../../levels/adapters/out/persistence/level-persistence.adapter';
import { RoomCategoryPersistenceAdapter } from '../../../room-categories/adapters/out/persistence/room-category-persistence.adapter';

//======== ARCHITECTURE: adapters with mappers implemented for this CreateAndUpdateRoomService ==========
@Service()
export class CreateAndUpdateRoomService implements CreateNewRoomRequest, UpdateTheRoomRequest {
    //other domains
    private getLevelForRoomDomainPort: GetLevelForRoomDomainPort;
    private getRoomCategoryForRoomDomainPort: GetRoomCategoryForRoomDomainPort;

    //self domain ports
    private createRoomPort: CreateRoomPort;
    private updateRoomPort: UpdateRoomPort;

    constructor(
        //other domains
        levelPersistenceAdpater: LevelPersistenceAdpater,
        roomCategoryPersistenceAdapter: RoomCategoryPersistenceAdapter,

        //self domain adater
        roomPersistenceAdapter: RoomPersistenceAdapter,
    ) {
        //other domains
        this.getLevelForRoomDomainPort = levelPersistenceAdpater;
        this.getRoomCategoryForRoomDomainPort = roomCategoryPersistenceAdapter;

        //self domain ports
        this.createRoomPort = roomPersistenceAdapter;
        this.updateRoomPort = roomPersistenceAdapter;
    }

    async createNewRoom(command: RoomCommand, roomData: RoomData): Promise<any> {
        const newRoom = await this.saveDataRoom(command, roomData, 'create');
        return newRoom;
    }
    async updateTheRoom(command: RoomCommand, roomData: RoomData): Promise<any> {
        const roomUpdated = await this.saveDataRoom(command, roomData, 'update');
        return roomUpdated;
    }
    async saveDataRoom(command: RoomCommand, roomData: RoomData, action: string): Promise<any> {
        //obtaining level with RoomDomainEntity
        const roomDomain1: RoomDomain = await this.getLevelForRoomDomainPort.getLevelForRoomDomain(
            roomData.getLevelId,
        );
        const roomDomain2: RoomDomain = await this.getRoomCategoryForRoomDomainPort.getRoomCategoryForRoomDomain(
            roomData.getCategoryId,
        );

        if (!roomDomain1.checkIfRoomLevelBelognsToHotel(command.getHotelId)) {
            return { message: 'This level does not belongs to this hotel ' };
        }

        if (!roomDomain2.checkIfRoomCategoryBelongsToHotel(command.getHotelId)) {
            return { message: 'This category does not belongs to this hotel ' };
        }

        let room;
        if (action === 'create') {
            const newRoom = await this.createRoomPort.createRoom(roomData, command.getHotelId);
            room = newRoom;
        } else if (action === 'update') {
            const roomUpdated = await this.updateRoomPort.updateRoom(roomData, roomData.getRoomId);
            room = roomUpdated;
        }

        return room;
    }
}
