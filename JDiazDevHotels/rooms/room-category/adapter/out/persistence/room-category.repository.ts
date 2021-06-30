export interface RoomCategoryRepository {
    saveRoomCategory(nameCategory:string, hotelId:number):Promise<any>
    getRoomCategory(roomCategoryId:number):Promise<any>
    getRoomCategories(hotelId:number):Promise<any>
    updateCategoryRoom(nameCategory:string, roomCategoryId:number):Promise<any>
    removeRoomCategory(roomCategoryId:number):Promise<any>
}