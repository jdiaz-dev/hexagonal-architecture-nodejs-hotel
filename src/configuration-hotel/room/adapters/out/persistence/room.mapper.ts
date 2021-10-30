import { Service } from 'typedi';
import { HoustingPriceDomain } from '../../../../../housting/domain/housting-price';
import { RoomWithLevelEntity } from '../../../domain/room-with-level';
import { RoomModel } from './room.model';
import { RoomDomain } from './../../../domain/room';

@Service()
export class RoomMapper {
    mapForSelfDomain(room: RoomModel): RoomWithLevelEntity {
        return new RoomWithLevelEntity(room.levelId);
    }
    mapForRoomDomain(room: RoomModel): RoomDomain{
        return new RoomDomain(room.id, room.conditionId)
    }
    mapToHoustingDomain(room: RoomModel): HoustingPriceDomain {
        return new HoustingPriceDomain(room.price);
    }
}
