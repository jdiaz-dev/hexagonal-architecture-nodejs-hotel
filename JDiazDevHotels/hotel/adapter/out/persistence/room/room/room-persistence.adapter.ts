import { Service } from "typedi";
import { RoomData } from "../../../../../domain/room-data";
import { CreateRoomPort } from './../../../../../application/port/out/room/room/create-room.port';
import { RoomRepository } from './room.repository';
import { RoomORM } from './room.orm';
import { RoomDatabaseEntity } from "./room-mysql.database-entity";
import { GetRoomsPort } from './../../../../../application/port/out/room/room/get-rooms.port';
import { UpdateRoomPort } from './../../../../../application/port/out/room/room/update-room.port';

@Service()
export class RoomPersistenceAdapter implements 
        CreateRoomPort,
        UpdateRoomPort,
        GetRoomsPort {
    private roomRepository:RoomRepository

    constructor(roomORM:RoomORM){
        this.roomRepository = roomORM 
    }
    async createRoom(roomData:RoomData, hotelId:number):Promise<any>{
        const _roomData = {
            name: roomData.getName,
            price:roomData.getPrice,
            details: roomData.getDetails,
            levelId:roomData.getLevelId,
            categoryId: roomData.getCategoryId,
            conditionId:roomData.getConditionId
        }

        const room = await this.roomRepository.createRoom(_roomData, hotelId)
        return room
    }
    async updateRoom(roomData:any, roomId:number):Promise<any>{
        const _roomData = {
            name: roomData.getName,
            price:roomData.getPrice,
            details: roomData.getDetails,
            levelId:roomData.getLevelId,
            categoryId: roomData.getCategoryId,
            conditionId:roomData.getConditionId
        }

        const room = await this.roomRepository.updateRoom(_roomData, roomId)
        return room
    }
    async getRooms(levelId:number):Promise<any>{
        const rooms = await this.roomRepository.getRooms(levelId)
        return rooms
    }

}