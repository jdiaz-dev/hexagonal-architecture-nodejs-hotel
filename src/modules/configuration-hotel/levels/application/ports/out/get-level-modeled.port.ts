import { LevelDomainEntity } from "../../../domain/level";

export interface GetLevelModeledPort {
    getLevelModeledToDomain(levelId:number):Promise<LevelDomainEntity>
}