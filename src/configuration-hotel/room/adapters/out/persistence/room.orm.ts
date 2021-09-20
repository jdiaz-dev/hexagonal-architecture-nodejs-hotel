import { Service } from 'typedi';
import { Room } from './room.model';
import { RoomRepository } from './room.repository';
import { Level } from '../../../../levels/adapters/out/persistence/level.model';
import { RoomCategory } from '../../../../room-categories/adapters/out/persistence/room-category.model';
import { RoomConditionDatabaseEntity } from '../../../../room-condition/adapters/out/persistence/room-condition-mysql.database-entity';
import { SETTINGS } from '../../../../../../settings/settings';

@Service()
export class RoomORM implements RoomRepository {
    async createRoom(roomData: any, hotelId: number): Promise<any> {
        console.log('-----data', roomData);
        try {
            const room = new Room();
            room.name = roomData.name;
            room.price = roomData.price;
            room.details = roomData.details;
            room.hotelId = hotelId;
            room.levelId = roomData.levelId;
            room.categoryId = roomData.categoryId;
            room.conditionId = roomData.conditionId;
            room.state = true;
            await room.save();
            return room;
        } catch (error) {
            console.log('-------------------', error);
        }
    }

    async getRoom(roomId: number): Promise<any> {
        const room = await Room.findByPk(roomId);
        return room;
    }
    async getRoomsByLevel(levelId: number, roomConditionId: number): Promise<any> {
        const query: any = { levelId: levelId, state: true };

        if (roomConditionId == SETTINGS.base.databaseIds.busyConditionId) {
            query['conditionId'] = roomConditionId;
        }

        try {
            const rooms: any = Room.findAll({
                where: query,
                include: [
                    {
                        model: Level,
                        as: 'level',
                        attributes: {
                            exclude: ['hotelId', 'createdAt', 'updatedAt', 'state'],
                        },
                    },
                    {
                        model: RoomCategory,
                        as: 'category',
                        attributes: {
                            exclude: ['price', 'hotelId', 'createdAt', 'updatedAt', 'state'],
                        },
                    },
                    {
                        model: RoomConditionDatabaseEntity,
                        as: 'condition',
                        attributes: {
                            exclude: ['hotelId', 'createdAt', 'updatedAt', 'state'],
                        },
                    },
                ],
                attributes: {
                    exclude: ['levelId', 'categoryId', 'conditionId', 'createdAt', 'updatedAt', 'state'],
                },
            });

            return rooms;
        } catch (error) {
            console.log('-------------------', error);
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
                        attributes: {
                            exclude: ['hotelId', 'createdAt', 'updatedAt', 'state'],
                        },
                    },
                    {
                        model: RoomCategory,
                        as: 'category',
                        attributes: {
                            exclude: ['hotelId', 'createdAt', 'updatedAt', 'state'],
                        },
                    },
                ],
                attributes: ['id', 'name', 'price', 'details'],
                order: [['name', 'ASC']],
            });
            return rooms;
        } catch (error) {
            console.log('-------------------', error);
        }
    }
    async updateRoom(roomData: any, roomId: number): Promise<any> {
        try {
            const room: any = await Room.findByPk(roomId);
            room.name = roomData.name;
            room.price = roomData.price;
            room.details = roomData.details;
            room.levelId = roomData.levelId;
            room.categoryId = roomData.categoryId;
            room.conditionId = roomData.conditionId;
            await room.save();

            return room;
        } catch (error) {
            console.log('-------------------', error);
        }
    }
    async updateConditionOfRoom(roomId: number, conditionId: number): Promise<any> {
        try {
            const room: any = await Room.findByPk(roomId);
            room.conditionId = conditionId;
            await room.save();

            return room;
        } catch (error) {
            console.log('-------------------', error);
        }
    }
    async removeRoom(roomId: number): Promise<any> {
        try {
            const room: any = await Room.findByPk(roomId);
            room.state = false;
            await room.save();

            return room;
        } catch (error) {
            console.log('-------------------', error);
        }
    }
}
