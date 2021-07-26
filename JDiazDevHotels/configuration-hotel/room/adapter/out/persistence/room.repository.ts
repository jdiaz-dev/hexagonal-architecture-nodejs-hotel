export interface RoomRepository {
    createRoom(roomData: any, hotelId: number): Promise<any>
    updateRoom(roomData: any, roomId: number): Promise<any>
    getRoom(roomId: number): Promise<any>
    getAllRooms(hotelId: number): Promise<any>
    getRoomsByLevel(levelId: number): Promise<any>
    removeRoom(roomId: number): Promise<any>
    updateConditionOfRoom(roomId: number, conditionId: number): Promise<any>

}
