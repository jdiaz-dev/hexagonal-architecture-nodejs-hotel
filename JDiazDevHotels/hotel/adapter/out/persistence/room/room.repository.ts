export interface RoomRepository {
    saveRoomCategory(nameCategory:string, hotelId:number):Promise<any>
    saveRoomCondition(nameCondition:string):Promise<any>
}