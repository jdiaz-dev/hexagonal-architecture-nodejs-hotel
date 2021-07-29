import { Service } from "typedi";
import { Room } from "./room.model";
import { RoomRepository } from './room.repository';
import { Level } from '../../../../levels/infraestructure/out/persistence/level.model';
import { RoomCategory } from '../../../../room-categories/infraestructure/out/persistence/room-category.model';
import { RoomConditionDatabaseEntity } from '../../../../room-condition/infraestructure/out/persistence/room-condition-mysql.database-entity';

@Service()
export class RoomORM implements RoomRepository {
    async createRoom(roomData: any, hotelId: number): Promise<any> {
        console.log('-----data', roomData)
        try {
            const room = new Room()
            room.name = roomData.name
            room.price = roomData.price
            room.details = roomData.details
            room.hotelId = hotelId
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
        const room = await Room.findByPk(roomId)
        return room
    }
    async getRoomsByLevel(levelId: number): Promise<any> {
        try {
            const rooms: any = Room.findAll({
                where: { levelId: levelId, state: true },
                include: [
                    {
                        model: Level,
                        as: 'level',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'state'] }
                    },
                    {
                        model: RoomCategory,
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
    async getAllRooms(hotelId: number): Promise<any> {
        try {
            const rooms = await Room.findAll({
                where: { hotelId: hotelId, state: true },
                include: [
                    {
                        model: Level,
                        as: 'level',
                        attributes: { exclude: ['hotelId', 'createdAt', 'updatedAt', 'state'] }
                    },
                    {
                        model: RoomCategory,
                        as: 'category',
                        attributes: { exclude: ['hotelId', 'createdAt', 'updatedAt', 'state'] }
                    },

                ],
                attributes: ['id', 'name', 'price', 'details']
            })
            return rooms
        } catch (error) {
            console.log('-------------------', error)
        }
    }
    async updateRoom(roomData: any, roomId: number): Promise<any> {
        try {
            const room: any = await Room.findByPk(roomId)
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
            const room: any = await Room.findByPk(roomId)
            room.conditionId = conditionId
            await room.save()

            return room
        } catch (error) {
            console.log('-------------------', error)
        }
    }
    async removeRoom(roomId: number): Promise<any> {
        try {
            const room: any = await Room.findByPk(roomId)
            room.state = false
            await room.save()

            return room
        } catch (error) {
            console.log('-------------------', error)
        }
    }
}