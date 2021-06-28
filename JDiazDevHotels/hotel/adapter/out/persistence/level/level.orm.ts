import { Service } from 'typedi';

import { LevelRepository } from './level.repository';
import { LevelDatabaseEntity } from './level-mysql.database-entity';

@Service()
export class LevelORM implements LevelRepository{
    async saveLevel(nameLevel:string, hotelId:number):Promise<any>{
        const level = new LevelDatabaseEntity()
        level.name = nameLevel
        level.hotelId = hotelId
        await level.save()
        return level
    }
}