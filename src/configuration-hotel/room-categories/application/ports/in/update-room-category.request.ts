import { RoomCategoryCommand } from "./room-category.command";

export interface UpdateRoomCategoryRequest {
    updateTheRoomCategory(nameCategory: string, price: number, roomCategoryId: number, command: RoomCategoryCommand): Promise<any>
}