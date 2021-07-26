export interface RoomCategoryRepository {
    saveRoomCategory(nameCategory: string, price: number, hotelId: number): Promise<any>
    getRoomCategory(roomCategoryId: number): Promise<any>
    getRoomCategories(hotelId: number): Promise<any>
    updateCategoryRoom(nameCategory: string, price: number, roomCategoryId: number): Promise<any>
    removeRoomCategory(roomCategoryId: number): Promise<any>
}