import { Service } from 'typedi';

import { RoomData } from '../../../application/services/room-data';
import { CreateRoomPort } from '../../../application/ports/out/self-domain/create-room.port';
import { RoomRepository } from './room.repository';
import { RoomORM } from './room.orm';
import { GetRoomsPort } from '../../../application/ports/out/self-domain/get-rooms.port';
import { UpdateRoomPort } from '../../../application/ports/out/self-domain/update-room.port';
import { RemoveRoomPort } from '../../../application/ports/out/self-domain/remove-room.port';
import { GetRoomModelForSelfDomainPort } from '../../../application/ports/out/self-domain/get-room-modeled.ports';
import { RoomWithLevelEntity } from '../../../domain/room-with-level';
import { GetRoomPort } from '../../../application/ports/out/self-domain/get-room.port';
import { UpdateConditionOfRoomPort } from '../../../application/ports/out/self-domain/update-condition-of-room';
import { GetRoomForHoustingDomainPort } from '../../../../../housting/application/ports/out/other-domain/get-room-for-housting-domain.port';
import { HoustingPriceDomain } from '../../../../../housting/domain/housting-price';
import { RoomMapper } from './room.mapper';
import { UpdateRoomConditionFromHoustingDomainPort } from '../../../../../housting/application/ports/out/other-domain/update-room-condition-from-housting-domain.port';
import { IQueries } from '../../../../../shared/interfaces/query.interface';
import { IGetRoomsWithConditionPort } from '../../../application/ports/out/self-domain/get-room-with-condition.port';
import { RoomConditions } from '../../../domain/room-conditions';

@Service()
export class RoomPersistenceAdapter
    implements
        CreateRoomPort,
        UpdateRoomPort,
        GetRoomsPort,
        GetRoomPort,
        UpdateConditionOfRoomPort,
        RemoveRoomPort,
        GetRoomModelForSelfDomainPort,
        GetRoomForHoustingDomainPort,
        IGetRoomsWithConditionPort,
        UpdateRoomConditionFromHoustingDomainPort
{
    private roomRepository: RoomRepository;

    constructor(private roomMapper: RoomMapper, roomORM: RoomORM) {
        this.roomRepository = roomORM;
    }
    async createRoom(roomData: RoomData, hotelId: number): Promise<any> {
        const _roomData = {
            name: roomData.getName,
            price: roomData.getPrice,
            details: roomData.getDetails,
            levelId: roomData.getLevelId,
            categoryId: roomData.getCategoryId,
            conditionId: roomData.getConditionId,
        };

        const room = await this.roomRepository.createRoom(_roomData, hotelId);
        return room;
    }
    async updateRoom(roomData: any, roomId: number): Promise<any> {
        const _roomData = {
            name: roomData.getName,
            price: roomData.getPrice,
            details: roomData.getDetails,
            levelId: roomData.getLevelId,
            categoryId: roomData.getCategoryId,
            conditionId: roomData.getConditionId,
        };

        const room = await this.roomRepository.updateRoom(_roomData, roomId);
        return room;
    }
    async getRoomForSelfDomain(roomId: number): Promise<RoomWithLevelEntity> {
        const room = await this.roomRepository.getRoom(roomId);
        return this.roomMapper.mapForSelfDomain(room);
    }
    async getRoomsByLevel(levelId: number, roomConditionId: number): Promise<any> {
        const rooms = await this.roomRepository.getRoomsByLevel(levelId, roomConditionId);
        return rooms;
    }
    async getRoomsWithCondition(roomId: number): Promise<RoomConditions> {
        const rooms = await this.roomRepository.getAllRooms(roomId);
        const roomsWithCondition = this.roomMapper.mapForRoomsWithConditions(rooms);
        return roomsWithCondition;
    }

    async getAllRooms(hotelId: number, queries: IQueries): Promise<any> {
        const rooms = await this.roomRepository.getAllRoomsPaged(hotelId, queries);
        return rooms;
    }
    async removeRoom(roomId: number): Promise<any> {
        const room = await this.roomRepository.removeRoom(roomId);
        return room;
    }
    async getRoom(roomId: number): Promise<any> {
        const room = await this.roomRepository.getRoom(roomId);
        return room;
    }
    async updateRoomCondition(roomId: number, conditionId: number): Promise<any> {
        const room = await this.roomRepository.updateRoomCondition(roomId, conditionId);
        return room;
    }
    async getRoomForHoustingDomain(roomId: number): Promise<HoustingPriceDomain> {
        const room = await this.roomRepository.getRoom(roomId);
        return this.roomMapper.mapToHoustingDomain(room);
    }
}
