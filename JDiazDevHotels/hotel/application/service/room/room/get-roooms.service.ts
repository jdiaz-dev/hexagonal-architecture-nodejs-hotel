import { Service } from "typedi";
import { GetRoomsRequest } from './../../../port/in/room/room/get-rooms.request';
import { GetRoomsPort } from './../../../port/out/room/room/get-rooms.port';
import { RoomPersistenceAdapter } from './../../../../adapter/out/persistence/room/room/room-persistence.adapter';

@Service()
export class GetRoomsService implements GetRoomsRequest {
    private getRoomsPort:GetRoomsPort
    
    constructor(
        roomPersistenceAdapter:RoomPersistenceAdapter
    ){
        this.getRoomsPort = roomPersistenceAdapter
    }
    async getRoomsOfLevel(levelId:number):Promise<any>{
        const rooms = await this.getRoomsPort.getRooms(levelId)
        return rooms
    }
}