import { CreateNewRoomCommand } from "./create-new-room.command";

export interface CreateNewRoomRequest {
    createNewRoom(command:CreateNewRoomCommand):Promise<any>
}