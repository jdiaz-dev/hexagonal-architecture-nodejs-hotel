import { RoomCommand } from './room.command';

export interface GetRoomsRequest {
    getRoomsOfLevel(levelId:number, roomCommand:RoomCommand):Promise<any>
}