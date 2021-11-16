import { RoomCategoryCommand } from "./room-category.command";

export interface RemoveRoomCategoryRequest {
    removeTheRoomCategory(roomCategory:number, command:RoomCategoryCommand):Promise<any>
}