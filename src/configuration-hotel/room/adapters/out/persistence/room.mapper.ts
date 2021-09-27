import { Service } from 'typedi';
import { HoustingPriceDomain } from '../../../../../housting/domain/housting-price';
import { RoomWithLevelEntity } from '../../../domain/room-with-level';
import { RoomModel } from './room.model';

@Service()
export class RoomMapper {
    mapForSelfDomain(room: RoomModel): RoomWithLevelEntity {
        return new RoomWithLevelEntity(room.levelId);
    }
    mapToHoustingDomain(room: RoomModel): HoustingPriceDomain {
        return new HoustingPriceDomain(room.price);
    }
}
