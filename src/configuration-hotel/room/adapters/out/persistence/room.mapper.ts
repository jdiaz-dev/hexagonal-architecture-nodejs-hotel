import { Service } from 'typedi';
import { HoustingPriceDomain } from '../../../../../housting/domain/housting-price';
import { RoomWithLevelEntity } from '../../../domain/room-with-level';
import { Room } from './room.model';

@Service()
export class RoomMapper {
    mapForSelfDomain(room: Room): RoomWithLevelEntity {
        return new RoomWithLevelEntity(room.levelId);
    }
    mapToHoustingDomain(room: Room): HoustingPriceDomain {
        return new HoustingPriceDomain(room.price);
    }
}
