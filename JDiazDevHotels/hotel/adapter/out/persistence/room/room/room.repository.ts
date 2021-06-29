export interface RoomRepository {
    createRoom(roomData:any, hotelId:number):Promise<any>
    updateRoom(roomData:any, roomId:number):Promise<any>
    getRooms(levelId:number):Promise<any>
}
