export interface CreateRoomCategoryPort {
    createRoomCategory(nameCategory: string, price: number, hotelId: number): Promise<any>
}