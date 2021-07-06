export interface UpdateCondtionOfRoomRequest {
    updateTheCondtionOfRoom(roomId:number, conditionId:number):Promise<any>
}