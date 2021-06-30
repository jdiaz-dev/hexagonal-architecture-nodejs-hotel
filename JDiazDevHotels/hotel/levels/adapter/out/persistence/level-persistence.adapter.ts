import { Service } from "typedi";

import { CreateLevelPort } from '../../../application/ports/out/create-level.port';
import { LevelRepository } from './level.repository';
import { GetHotelLevelsPort } from "../../../application/ports/out/get-hotel-levels.port";

import { LevelORM } from './level.orm';
import { GetLevelPort } from './../../../application/ports/out/get-level.port';

@Service()
export class LevelPersistenceAdpater implements 
        CreateLevelPort,
        GetHotelLevelsPort,
        GetLevelPort {
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