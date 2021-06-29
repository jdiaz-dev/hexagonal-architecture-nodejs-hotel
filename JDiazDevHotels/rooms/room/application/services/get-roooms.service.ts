import { Service } from "typedi";
import { GetRoomsRequest } from '../ports/in/get-rooms.request';
import { GetRoomsPort } from '../ports/out/get-rooms.port';
import { RoomPersistenceAdapter } from '../../adapter/out/persistence/room-persistence.adapter';

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