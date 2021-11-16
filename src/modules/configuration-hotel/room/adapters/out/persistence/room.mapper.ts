import { Service } from 'typedi';
import { HoustingPriceDomain } from '../../../../../housting/domain/housting-price';
import { RoomWithLevelEntity } from '../../../domain/room-with-level';
import { RoomModel } from './room.model';
import { RoomDomain } from '../../../domain/room';
import { RoomConditions } from '../../../domain/room-conditions';
import { IRoomConditions } from '../../../domain/room-conditions';

@Service()
export class RoomMapper {
    mapForSelfDomain(room: RoomModel): RoomWithLevelEntity {
        return new RoomWithLevelEntity(room.levelId);
    }
    mapForRoomsWithConditions(rooms: RoomModel[]): RoomConditions {
        const _rooms: IRoomConditions[] = [];
        let _room: IRoomConditions;
        rooms.forEach((room: RoomModel) => {
            _room = {
                roomId: room.id,
                conditionId: room.conditionId,
            };
            _rooms.push(_room);
        });

        return new RoomConditions(_rooms);
    }
    /* mapForRoomDomain(room: RoomModel): RoomDomain{
        return new RoomDomain(room.id, room.conditionId)
    } */
    mapToHoustingDomain(room: RoomModel): HoustingPriceDomain {
        return new HoustingPriceDomain(room.price);
    }
}
