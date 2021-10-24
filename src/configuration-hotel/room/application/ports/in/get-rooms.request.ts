import { IQueries } from '../../../../../shared/interfaces/query.interface';
import { RoomCommand } from './room.command';

export interface GetRoomsRequest {
    getRoomsByLevel(levelId: number, roomConditionId: number, roomCommand: RoomCommand): Promise<any>;
    getAllRooms(hotelId: number, queries: IQueries): Promise<any>;
}
