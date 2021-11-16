import { RoomWithLevelEntity } from '../../../../domain/room-with-level';

export interface GetRoomModelForSelfDomainPort {
    getRoomForSelfDomain(roomId: number): Promise<RoomWithLevelEntity>;
}
