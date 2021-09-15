import { RoomDomain } from '../../../../domain/room';

export interface GetLevelForRoomDomainPort {
    getLevelForRoomDomain(levelId: number): Promise<RoomDomain>;
}
