export interface UpdateRoomCondtionRequest {
    updateTheCondtionOfRoom(roomId: number, conditionId: number): Promise<any>;
}
