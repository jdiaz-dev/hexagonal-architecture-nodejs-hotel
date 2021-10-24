import { IQueries } from '../../../../../shared/interfaces/query.interface';

export interface RoomRepository {
    createRoom(roomData: any, hotelId: number): Promise<any>;
    updateRoom(roomData: any, roomId: number): Promise<any>;
    getRoom(roomId: number): Promise<any>;
    getAllRooms(hotelId: number, queries: IQueries): Promise<any>;
    getRoomsByLevel(levelId: number, roomConditionId: number): Promise<any>;
    removeRoom(roomId: number): Promise<any>;
    updateRoomCondition(roomId: number, conditionId: number): Promise<any>;
}
