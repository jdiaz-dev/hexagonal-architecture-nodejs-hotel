import { RoomDomainEntity } from "../../../../domain/room";

export interface GetLevelForRoomDomain {
    getLevelForRoomDomain(levelId:number):Promise<RoomDomainEntity>
}