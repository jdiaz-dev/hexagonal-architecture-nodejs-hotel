export interface CreateNewHotelLevelRequest {
    createNewLevel(numberLevel: number, nameLevel: string, hotelId: number): Promise<any>
}