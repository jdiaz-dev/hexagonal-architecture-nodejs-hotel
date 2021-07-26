import { Service } from "typedi";
import { LevelPersistenceAdpater } from "../../infraestructure/out/persistence/level-persistence.adapter";
import { LevelDomainEntity } from "../../domain/level";
import { HotelLevelCommand } from "../ports/in/hotel-level.command";
import { GetLevelModeledPort } from "../ports/out/get-level-modeled.port";
import { RemoveHotelLevelRequest } from '../ports/in/remove-hotel-level.request';
import { RemoveHotelLevelPort } from '../ports/out/remove-hotel-level.port';

@Service()
export class RemoveHotelLevelService implements RemoveHotelLevelRequest {
    private getLevelModeledPort: GetLevelModeledPort
    private removeHotelLevelPort: RemoveHotelLevelPort

    constructor(levelPersistenceAdpater: LevelPersistenceAdpater,) {
        this.getLevelModeledPort = levelPersistenceAdpater
        this.removeHotelLevelPort = levelPersistenceAdpater
    }
    async removeTheHotelLevel(levelId: number, command: HotelLevelCommand): Promise<any> {
        const level: LevelDomainEntity = await this.getLevelModeledPort.getLevelModeledToDomain(levelId)

        if (!level.checkIfLevelBelongsToHotel(command.getHotelId)) {
            return { message: 'You cannot remove this level' }
        }

        const roomRemoved = await this.removeHotelLevelPort.removeHotelLevel(levelId)
        if (!roomRemoved) {
            return { message: 'A problem has happened trying to remove this level' }
        }
        return { message: 'The level was removed successly' }
    }
}