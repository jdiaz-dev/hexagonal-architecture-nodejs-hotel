export interface GetRoomsPort {
    getRoomsByLevel(levelId: number, roomConditionId: number): Promise<any>
    getAllRooms(hotelId: number): Promise<any>
}