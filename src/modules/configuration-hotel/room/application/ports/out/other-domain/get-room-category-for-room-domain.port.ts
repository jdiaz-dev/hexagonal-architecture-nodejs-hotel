import { RoomDomain } from '../../../../domain/room';

export interface GetRoomCategoryForRoomDomainPort {
    getRoomCategoryForRoomDomain(roomCategoryId: number): Promise<RoomDomain>;
}
