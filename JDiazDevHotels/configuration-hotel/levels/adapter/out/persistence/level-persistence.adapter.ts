import { Service } from "typedi";

import { CreateLevelPort } from '../../../application/ports/out/create-level.port';
import { LevelRepository } from './level.repository';
import { GetHotelLevelsPort } from "../../../application/ports/out/get-hotel-levels.port";

import { LevelORM } from './level.orm';
import { GetLevelModeledPort } from '../../../application/ports/out/get-level-modeled.port';
import { UpdateLevelPort } from '../../../application/ports/out/update-level.port';
import { LevelDomainEntity } from '../../../domain/level';
import { GetLevelPort } from '../../../application/ports/out/get-level.port';
import { RemoveHotelLevelPort } from '../../../application/ports/out/remove-hotel-level.port';

@Service()
export class LevelPersistenceAdpater implements
    CreateLevelPort,
    GetHotelLevelsPort,
    GetLevelPort,
    GetLevelModeledPort,
    UpdateLevelPort,
    RemoveHotelLevelPort {
    private levelRepository: LevelRepository

    constructor(levelORM: LevelORM) {
        this.levelRepository = levelORM
    }
    async createLevel(nameLevel: string, hotelId: number): Promise<any> {
        const level = await this.levelRepository.saveLevel(nameLevel, hotelId)
        return level
    }
    async getLevels(hotelId: number): Promise<any> {
        const levels = await this.levelRepository.getLevels(hotelId)
        return levels
    }
    async getLevel(levelId: number): Promise<any> {
        const level = await this.levelRepository.getLevel(levelId)
        return level
    }
    async getLevelModeledToDomain(hotelLevelId: number): Promise<LevelDomainEntity> {
        const level = await this.levelRepository.getLevel(hotelLevelId)
        return new LevelDomainEntity(level.hotelId)
    }
    async updateLevel(nameLevel: string, levelId: number): Promise<any> {
        const level = await this.levelRepository.updateLevel(nameLevel, levelId)
        return level
    }
    async removeHotelLevel(levelId: number): Promise<any> {
        const level = await this.levelRepository.removeHotelLevel(levelId)
        return level
    }
}