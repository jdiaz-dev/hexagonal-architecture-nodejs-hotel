import { Service } from 'typedi';
import { RoomDomain } from '../../../../room/domain/room';
import { RoomCategory } from './room-category.model';

@Service()
export class RoomCategoryMapper {
    /** @internal */
    mapToRoomDomain(roomCategory: RoomCategory): RoomDomain {
        return new RoomDomain(roomCategory.hotelId);
    }
}
