import { Service } from "typedi";
import { CreateLevelPort } from '../../../../application/port/out/level/create-level.port';
import { LevelRepository } from './level.repository';
import { LevelORM } from './level.orm';

@Service()
export class LevelPersistenceAdpater implements CreateLevelPort {
    private levelRepository:LevelRepository
    
    constructor(levelORM:LevelORM){
        this.levelRepository = levelORM
    }
    async createLevel(nameLevel:string, hotelId:number):Promise<any>{
        const level = await this.levelRepository.saveLevel(nameLevel, hotelId)
        return level
    }
}