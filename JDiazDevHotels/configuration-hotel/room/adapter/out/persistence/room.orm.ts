import { Service } from "typedi";
import { RoomDatabaseEntity } from "./room-mysql.database-entity";
import { RoomRepository } from './room.repository';
import { LevelDatabaseEntity } from '../../../../levels/adapter/out/persistence/level-mysql.database-entity';
import { RoomCategoryDatabaseEntity } from '../../../../room-categories/adapter/out/persistence/room-category-mysql.database-entity';
import { RoomConditionDatabaseEntity } from '../../../../room-condition/adapter/out/persistence/room-condition-mysql.database-entity';

@Service()
export class RoomORM implements RoomRepository {
    async createRoom(roomData: any, hotelId: number): Promise<any> {
        try {
            const room = new RoomDatabaseEntity()
            room.name = roomData.name
            room.price = roomData.price
            room.details = roomData.details
            room.levelId = roomData.levelId
            room.categoryId = roomData.categoryId
            room.conditionId = roomData.conditionId
            room.state = true
            await room.save()
            return room
        } catch (error) {
            console.log('-------------------', error)
        }
    }

    async getRoom(roomId: number): Promise<any> {
        const room = await RoomDatabaseEntity.findByPk(roomId)
        return room
    }
    async getRooms(levelId: number): Promise<any> {
        try {
            const rooms: any = RoomDatabaseEntity.findAll({
                where: { levelId: levelId, state: true },
                include: [
                    {
                        model: LevelDatabaseEntity,
                        as: 'level',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'state'] }
                    },
                    {
                        model: RoomCategoryDatabaseEntity,
                        as: 'category',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'state'] }
                    },
                    {
                        model: RoomConditionDatabaseEntity,
                        as: 'condition',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'state'] }
                    }
                ],
                attributes: {
                    exclude: [
                        'levelId',
                        'categoryId',
                        'conditionId',
                        'createdAt',
                        'updatedAt',
                        'state',
                    ]
                }
            })

            return rooms
        } catch (error) {
            console.log('-------------------', error)
        }
    }
    async updateRoom(roomData: any, roomId: number): Promise<any> {
        try {
            const room: any = await RoomDatabaseEntity.findByPk(roomId)
            room.name = roomData.name
            room.price = roomData.price
            room.details = roomData.details
            room.levelId = roomData.levelId
            room.categoryId = roomData.categoryId
            room.conditionId = roomData.conditionId
            await room.save()

            return room
        } catch (error) {
            console.log('-------------------', error)
        }
    }
    async updateConditionOfRoom(roomId: number, conditionId: number): Promise<any> {
        try {
            const room: any = await RoomDatabaseEntity.findByPk(roomId)
            room.conditionId = conditionId
            await room.save()

            return room
        } catch (error) {
            console.log('-------------------', error)
        }
    }
    async removeRoom(roomId: number): Promise<any> {
        try {
            const room: any = await RoomDatabaseEntity.findByPk(roomId)
            room.state = false
            await room.save()

            return room
        } catch (error) {
            console.log('-------------------', error)
        }
    }
}