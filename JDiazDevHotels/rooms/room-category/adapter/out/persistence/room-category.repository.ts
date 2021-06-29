export interface RoomCategoryRepository {
    saveRoomCategory(nameCategory:string, hotelId:number):Promise<any>
    getRoomCategory(roomCategoryId:number):Promise<any>
}