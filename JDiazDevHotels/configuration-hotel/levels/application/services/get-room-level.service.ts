import { Service } from "typedi";


import { LevelPersistenceAdpater } from '../../infraestructure/out/persistence/level-persistence.adapter';
import { GetLevelForRoomDomain } from '../../../room/application/ports/out/other-domain/get-level-for-room-domain';
import { RoomDomainEntity } from "../../../room/domain/room";
import { GetLevelPort } from "../ports/out/get-level.port";

@Service()
export class GetRoomLevelService implements GetLevelForRoomDomain {
    private getLevelPort: GetLevelPort

    constructor(levelPersistenceAdpater: LevelPersistenceAdpater) {
        this.getLevelPort = levelPersistenceAdpater
    }
    async getLevelForRoomDomain(levelId: number): Promise<RoomDomainEntity> {
        const level = await this.getLevelPort.getLevel(levelId)
        return new RoomDomainEntity(level.hotelId)
    }
}

