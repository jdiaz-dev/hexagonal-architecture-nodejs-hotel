import { Service } from 'typedi';

import { LevelRepository } from './level.repository';
import { LevelDatabaseEntity } from './level-mysql.database-entity';
import { HotelDatabaseEntity } from '../hotel/hotel-mysql.database-entity';

@Service()
export class LevelORM implements LevelRepository{
    async saveLevel(nameLevel:string, hotelId:number):Promise<any>{
        const level = new LevelDatabaseEntity()
        level.name = nameLevel
        level.hotelId = hotelId
        await level.save()
        return level
    }
    async getLevels(hotelId:number):Promise<any>{
        const levels = await LevelDatabaseEntity.findAll({
            where:{ hotelId: hotelId}, 
            include:{
                model:HotelDatabaseEntity,
                as:'hotel',
                attributes:{ exclude:['createdAt', 'updatedAt', 'state'  ]}
            },
            attributes: { 
                exclude: [ 'hotelId', 'createdAt', 'updatedAt', 'state' ]
            }})
        return levels
    }
    async getLevel(hotelLevelId:number):Promise<any>{
        const level = await LevelDatabaseEntity.findByPk(hotelLevelId)
        return level
    }
}