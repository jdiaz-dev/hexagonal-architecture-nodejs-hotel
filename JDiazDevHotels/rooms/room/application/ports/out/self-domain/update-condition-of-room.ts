export interface UpdateConditionOfRoomPort {
    updateConditionOfRoom(roomId:number, conditionId:number):Promise<any>
}