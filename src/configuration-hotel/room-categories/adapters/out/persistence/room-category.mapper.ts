import { Service } from 'typedi';
import { RoomDomain } from '../../../../room/domain/room';
import { RoomCategory } from './room-category.model';

@Service()
export class RoomCategoryMapper {
    mapToRoomDomain(roomCategory: RoomCategory): RoomDomain {
        return new RoomDomain(roomCategory.hotelId);
    }
}
