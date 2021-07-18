import { RoomCommand } from "./room.command";
import { RoomData } from '../../services/room-data';

export interface CreateNewRoomRequest {
    createNewRoom(command: RoomCommand, roomData: RoomData): Promise<any>
}