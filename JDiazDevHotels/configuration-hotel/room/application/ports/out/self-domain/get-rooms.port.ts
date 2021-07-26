export interface GetRoomsPort {
    getRoomsByLevel(levelId: number): Promise<any>
    getAllRooms(hotelId: number): Promise<any>
}