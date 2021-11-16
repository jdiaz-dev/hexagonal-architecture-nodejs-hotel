export interface RoomConditionRepository {
    saveRoomCondition(nameCondition:string):Promise<any>
    getRoomCondtion(roomConditionId:number):Promise<any>
}