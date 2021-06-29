import { RoomData } from '../../../domain/room-data';

export interface CreateRoomPort {
    createRoom(roomData:RoomData, hotelId:number):Promise<any>
}