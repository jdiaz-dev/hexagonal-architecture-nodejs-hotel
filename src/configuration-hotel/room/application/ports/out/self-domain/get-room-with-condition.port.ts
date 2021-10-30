import { RoomDomain } from '../../../../domain/room';

export interface IGetRoomWithConditionPort {
    getRoomWithCondition(roomId: number): Promise<RoomDomain>;
}
