import { Service } from "typedi";

import { RoomData } from "../../../application/services/room-data";
import { CreateRoomPort } from '../../../application/ports/out/self-domain/create-room.port';
import { RoomRepository } from './room.repository';
import { RoomORM } from './room.orm';
import { GetRoomsPort } from '../../../application/ports/out/self-domain/get-rooms.port';
import { UpdateRoomPort } from '../../../application/ports/out/self-domain/update-room.port';
import { RemoveRoomPort } from '../../../application/ports/out/self-domain/remove-room.port';
import { GetRoomModelToDomainPort } from "../../../application/ports/out/self-domain/get-room-modeled.ports";
import { RoomWithLevelEntity } from '../../../domain/room-with-level';
import { GetRoomPort } from '../../../application/ports/out/self-domain/get-room.port';
import { UpdateConditionOfRoomPort } from '../../../application/ports/out/self-domain/update-condition-of-room';

@Service()
export class RoomPersistenceAdapter implements
    CreateRoomPort,
    UpdateRoomPort,
    GetRoomModelToDomainPort,
    GetRoomsPort,
    GetRoomPort,
    UpdateConditionOfRoomPort,
    RemoveRoomPort {
    private roomRepository: RoomRepository

    constructor(roomORM: RoomORM) {
        this.roomRepository = roomORM
    }
    async createRoom(roomData: RoomData, hotelId: number): Promise<any> {
        const _roomData = {
            name: roomData.getName,
            price: roomData.getPrice,
            details: roomData.getDetails,
            levelId: roomData.getLevelId,
            categoryId: roomData.getCategoryId,
            conditionId: roomData.getConditionId
        }

        const room = await this.roomRepository.createRoom(_roomData, hotelId)
        return room
    }
    async updateRoom(roomData: any, roomId: number): Promise<any> {
        const _roomData = {
            name: roomData.getName,
            price: roomData.getPrice,
            details: roomData.getDetails,
            levelId: roomData.getLevelId,
            categoryId: roomData.getCategoryId,
            conditionId: roomData.getConditionId
        }

        const room = await this.roomRepository.updateRoom(_roomData, roomId)
        return room
    }
    async getRoomModeledToDomain(roomId: number): Promise<RoomWithLevelEntity> {
        const room = await this.roomRepository.getRoom(roomId)
        return new RoomWithLevelEntity(room.levelId)
    }
    async getRooms(levelId: number): Promise<any> {
        const rooms = await this.roomRepository.getRooms(levelId)
        return rooms
    }
    async removeRoom(roomId: number): Promise<any> {
        const room = await this.roomRepository.removeRoom(roomId)
        return room
    }
    async getRoom(roomId: number): Promise<any> {
        const room = await this.roomRepository.getRoom(roomId)
        return room
    }
    async updateConditionOfRoom(roomId: number, conditionId: number): Promise<any> {
        const room = await this.roomRepository.updateConditionOfRoom(roomId, conditionId)
        return room
    }

}