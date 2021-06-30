import { RoomData } from '../../../services/room-data';

export interface CreateRoomPort {
    createRoom(roomData:RoomData, hotelId:number):Promise<any>
}