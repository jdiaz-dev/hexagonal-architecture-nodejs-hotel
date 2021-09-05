import { RoomCategoryCommand } from './room-category.command';

export interface CreateRoomCategoryRequest {
    createNewRoomCategory(nameCategory: string, price: number, hotelId: number): Promise<any>

}