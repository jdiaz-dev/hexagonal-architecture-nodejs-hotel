import { RoomCommand } from './room.command';

export interface GetRoomsRequest {
    getRoomsByLevel(levelId: number, roomCommand: RoomCommand): Promise<any>
    getAllRooms(hotelId: number): Promise<any>
}