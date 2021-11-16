export interface UpdateRoomConditionFromHoustingDomainPort {
    updateRoomCondition(roomId: number, conditionId: number): Promise<any>;
}
