export interface UpdateRoomPort {
    updateRoom(roomData:any, roomId:number):Promise<any>
}