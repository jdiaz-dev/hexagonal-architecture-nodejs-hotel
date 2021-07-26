export interface UpdateRoomCategoryPort {
    updateCategoryRoom(nameCategory: string, price: number, roomCategoryId: number): Promise<any>
}