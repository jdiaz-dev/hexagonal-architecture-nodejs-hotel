import { RoomCommand } from './room.command';
import { RoomWithLevelCommand } from './room-with-level.domain';

export interface RemoveTheRoomRequest {
    removeTheRoom(
        levelId:number, 
        roomId:number, 
        command:RoomCommand, 
        roomWithLevelDomain:RoomWithLevelCommand):Promise<any>
}