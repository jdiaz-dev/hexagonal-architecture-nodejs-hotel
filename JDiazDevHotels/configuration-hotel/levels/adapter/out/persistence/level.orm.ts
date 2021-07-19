import { Service } from 'typedi';

import { LevelRepository } from './level.repository';
import { LevelDatabaseEntity } from './level-mysql.database-entity';
import { HotelDatabaseEntity } from '../../../../../managament/hotels/infraestucture/out/persistence/hotel-mysql.database-entity';

@Service()
export class LevelORM implements LevelRepository {
    async saveLevel(nameLevel: string, hotelId: number): Promise<any> {
        try {
            const level = new LevelDatabaseEntity()
            level.name = nameLevel
            level.hotelId = hotelId
            await level.save()
            return level
        } catch (error) {
            console.log('------------', error)
        }
    }
    async getLevels(hotelId: number): Promise<any> {
        try {
            const levels = await LevelDatabaseEntity.findAll({
                where: { hotelId: hotelId, state: true },
                include: {
                    model: HotelDatabaseEntity,
                    as: 'hotel',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'state'] }
                },
                attributes: {
                    exclude: ['hotelId', 'createdAt', 'updatedAt', 'state']
                }
            })
            return levels
        } catch (error) {
            console.log('------------', error)
        }
    }
    async getLevel(levelId: number): Promise<any> {
        try {
            const level = await LevelDatabaseEntity.findByPk(levelId)
            return level
        } catch (error) {
            console.log('------------', error)
        }
    }
    async updateLevel(nameLevel: string, levelId: number): Promise<any> {
        try {
            const level: any = await LevelDatabaseEntity.findByPk(levelId)
            level.name = nameLevel
            await level.save()

            return level
        } catch (error) {
            console.log('------------', error)
        }
    }
    async removeHotelLevel(levelId: number): Promise<any> {
        try {
            const level: any = await LevelDatabaseEntity.findByPk(levelId)
            console.log('-----------------the level to remove', level)
            level.state = false
            await level.save()

            return level
        } catch (error) {
            console.log('------------', error)
        }
    }
}