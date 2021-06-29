import { CreateNewRoomCommand } from "./create-new-room.command";

export interface UpdateTheRoomRequest {
    updateTheRoom(command:CreateNewRoomCommand):Promise<any>
}