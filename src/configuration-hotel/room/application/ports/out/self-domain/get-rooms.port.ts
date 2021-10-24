import { IQueries } from '../../../../../../shared/interfaces/query.interface';

export interface GetRoomsPort {
    getRoomsByLevel(levelId: number, roomConditionId: number): Promise<any>;
    getAllRooms(hotelId: number, queries: IQueries): Promise<any>;
}
