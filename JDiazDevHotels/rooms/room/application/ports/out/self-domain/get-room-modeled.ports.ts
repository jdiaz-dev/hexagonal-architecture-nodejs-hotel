import { RoomWithLevelEntity } from "../../../../domain/room-with-level";

export interface GetRoomModelToDomainPort {
    getRoomModeledToDomain(roomId:number):Promise<RoomWithLevelEntity>
}