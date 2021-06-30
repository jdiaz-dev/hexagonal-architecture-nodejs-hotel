import { RoomCategoryCommand } from "./room-category.command";

export interface UpdateRoomCategoryRequest {
    updateTheRoomCategory(nameCategory:string, roomCategoryId:number, command:RoomCategoryCommand):Promise<any>
}