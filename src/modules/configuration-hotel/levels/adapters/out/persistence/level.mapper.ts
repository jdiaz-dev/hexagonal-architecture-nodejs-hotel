import { Service } from 'typedi';
import { RoomDomain } from '../../../../room/domain/room';
import { Level } from './level.model';

@Service()
export class LevelMapper {
    mapToRoomDomain(level: Level): RoomDomain {
        return new RoomDomain(level.hotelId);
    }
}
