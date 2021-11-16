export interface UpdateConditionOfRoomPort {
    updateRoomCondition(roomId: number, conditionId: number): Promise<any>;
}
