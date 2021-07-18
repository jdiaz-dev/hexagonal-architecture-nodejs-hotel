import { RoomData } from "../../services/room-data";
import { RoomCommand } from "./room.command";

export interface UpdateTheRoomRequest {
    updateTheRoom(command:RoomCommand, roomData:RoomData):Promise<any>
}