import { Service } from 'typedi';

import { LevelRepository } from './level.repository';
import { Level } from './level.model';
import { HotelDatabaseEntity } from '../../../../../managament/hotels/infraestucture/out/persistence/hotel-mysql.database-entity';

@Service()
export class LevelORM implements LevelRepository {
    async saveLevel(numberLevel: number, nameLevel: string, hotelId: number): Promise<any> {
        try {
            const level = new Level()
            level.number = numberLevel
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
            const levels = await Level.findAll({
                where: { hotelId: hotelId, state: true },
                /* include: {
                    model: HotelDatabaseEntity,
                    as: 'hotel',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'state'] }
                }, */
                attributes: {
                    exclude: ['hotelId', 'createdAt', 'updatedAt', 'state']
                },
                order: [
                    ['number', 'ASC']
                ]
            })
            return levels
        } catch (error) {
            console.log('------------', error)
        }
    }
    async getLevel(levelId: number): Promise<any> {
        try {
            const level = await Level.findByPk(levelId)
            return level
        } catch (error) {
            console.log('------------', error)
        }
    }
    async updateLevel(numberLevel: number, nameLevel: string, levelId: number): Promise<any> {
        try {
            const level: any = await Level.findByPk(levelId, {
                attributes: {
                    exclude: ['hotelId', 'state', 'createdAt']
                }
            })
            level.number = numberLevel
            level.name = nameLevel
            await level.save()

            return level
        } catch (error) {
            console.log('------------', error)
        }
    }
    async removeHotelLevel(levelId: number): Promise<any> {
        try {
            const level: any = await Level.findByPk(levelId)
            console.log('-----------------the level to remove', level)
            level.state = false
            await level.save()

            return level
        } catch (error) {
            console.log('------------', error)
        }
    }
}
