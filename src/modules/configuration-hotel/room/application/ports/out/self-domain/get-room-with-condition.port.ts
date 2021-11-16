import { RoomConditions } from '../../../../domain/room-conditions';

export interface IGetRoomsWithConditionPort {
    getRoomsWithCondition(roomId: number): Promise<RoomConditions>;
}
