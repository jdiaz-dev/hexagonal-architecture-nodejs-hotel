import { Service } from 'typedi';

import { CreateLevelPort } from '../../../application/ports/out/create-level.port';
import { LevelRepository } from './level.repository';
import { GetHotelLevelsPort } from '../../../application/ports/out/get-hotel-levels.port';

import { LevelORM } from './level.orm';
import { GetLevelModeledPort } from '../../../application/ports/out/get-level-modeled.port';
import { UpdateLevelPort } from '../../../application/ports/out/update-level.port';
import { LevelDomainEntity } from '../../../domain/level';
import { GetLevelPort } from '../../../application/ports/out/get-level.port';
import { RemoveHotelLevelPort } from '../../../application/ports/out/remove-hotel-level.port';
import { LevelMapper } from './level.mapper';
import { GetLevelForRoomDomainPort } from '../../../../room/application/ports/out/other-domain/get-level-for-room-domain.port';
import { RoomDomain } from '../../../../room/domain/room';
import { IQueries } from '../../../../../../shared/interfaces/query.interface';

@Service()
export class LevelPersistenceAdpater
    implements
        CreateLevelPort,
        GetHotelLevelsPort,
        GetLevelPort,
        GetLevelModeledPort,
        UpdateLevelPort,
        RemoveHotelLevelPort,
        GetLevelForRoomDomainPort
{
    private levelRepository: LevelRepository;

    constructor(private levelMapper: LevelMapper, levelORM: LevelORM) {
        this.levelRepository = levelORM;
    }
    async createLevel(numberLevel: number, nameLevel: string, hotelId: number): Promise<any> {
        const level = await this.levelRepository.saveLevel(numberLevel, nameLevel, hotelId);
        return level;
    }
    async getLevels(hotelId: number, queries: IQueries): Promise<any> {
        const levels = await this.levelRepository.getLevels(hotelId, queries);
        return levels;
    }
    async getLevel(levelId: number): Promise<any> {
        const level = await this.levelRepository.getLevel(levelId);
        return level;
    }
    async getLevelModeledToDomain(hotelLevelId: number): Promise<LevelDomainEntity> {
        const level = await this.levelRepository.getLevel(hotelLevelId);
        return new LevelDomainEntity(level.hotelId);
    }
    async updateLevel(numberLevel: number, nameLevel: string, levelId: number): Promise<any> {
        const level = await this.levelRepository.updateLevel(numberLevel, nameLevel, levelId);
        return level;
    }
    async removeHotelLevel(levelId: number): Promise<any> {
        const level = await this.levelRepository.removeHotelLevel(levelId);
        return level;
    }
    async getLevelForRoomDomain(levelId: number): Promise<RoomDomain> {
        const level = await this.getLevel(levelId);
        return this.levelMapper.mapToRoomDomain(level);
    }
}
