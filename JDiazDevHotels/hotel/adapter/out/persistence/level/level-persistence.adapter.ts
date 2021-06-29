import { Service } from "typedi";

import { CreateLevelPort } from '../../../../application/port/out/level/create-level.port';
import { LevelRepository } from './level.repository';
import { GetHotelLevelsPort } from "../../../../application/port/out/level/get-hotel-levels.port";

import { LevelORM } from './level.orm';

@Service()
export class LevelPersistenceAdpater implements 
        CreateLevelPort,
        GetHotelLevelsPort {
    private levelRepository:LevelRepository
    
    constructor(levelORM:LevelORM){
        this.levelRepository = levelORM
    }
    async createLevel(nameLevel:string, hotelId:number):Promise<any>{
        const level = await this.levelRepository.saveLevel(nameLevel, hotelId)
        return level
    }
    async getLevels(hotelId:number):Promise<any>{
        const levels = await this.levelRepository.getLevels(hotelId)
        return levels
    }
    async getLevel(hotelLevelId:number):Promise<any>{
        const level = await this.levelRepository.getLevel(hotelLevelId)
        return level       
    }
    
}