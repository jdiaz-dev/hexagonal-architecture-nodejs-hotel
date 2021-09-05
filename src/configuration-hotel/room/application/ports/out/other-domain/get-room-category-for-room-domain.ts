import { RoomDomainEntity } from '../../../../domain/room';

export interface GetRoomCategoryForRoomDomain {
    getRoomCategoryForRoomDomain(roomCategoryId: number): Promise<RoomDomainEntity>
}