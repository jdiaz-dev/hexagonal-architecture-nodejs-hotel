import { RoomCategoryCommand } from './room-category.command';

export interface CreateRoomCategoryRequest {
    createNewRoomCategory(nameCategory:string, hotelId:number):Promise<any>
    
}