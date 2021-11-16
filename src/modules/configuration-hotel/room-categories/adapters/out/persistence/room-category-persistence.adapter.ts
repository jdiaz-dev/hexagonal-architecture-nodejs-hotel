import { Service } from 'typedi';
import { RoomCategoryORM } from './room-category.orm';
import { CreateRoomCategoryPort } from '../../../application/ports/out/self-domain/create-room-category.port';
import { GetRoomCategoryPort } from '../../../application/ports/out/self-domain/get-room-category.port';
import { RoomCategoryRepository } from './room-category.repository';
import { GetRoomCategoriesPort } from '../../../application/ports/out/self-domain/get-room-categories.port';
import { GetRoomCategoryModeledPort } from '../../../application/ports/out/self-domain/get-room-category-modeled.port';
import { UpdateRoomCategoryPort } from '../../../application/ports/out/self-domain/update-room-category.port';
import { RoomCategoryDomainEntity } from '../../../domain/room-category';
import { RemoveRoomCategoryPort } from '../../../application/ports/out/self-domain/remove-room-categoy.port';
import { RoomCategoryMapper } from './room-category.mapper';
import { GetRoomCategoryForRoomDomainPort } from '../../../../room/application/ports/out/other-domain/get-room-category-for-room-domain.port';
import { RoomDomain } from '../../../../room/domain/room';

@Service()
export class RoomCategoryPersistenceAdapter
    implements
        CreateRoomCategoryPort,
        GetRoomCategoryPort,
        GetRoomCategoriesPort,
        GetRoomCategoryModeledPort,
        UpdateRoomCategoryPort,
        RemoveRoomCategoryPort,
        GetRoomCategoryForRoomDomainPort
{
    private roomCategoryRepository: RoomCategoryRepository;

    constructor(private RoomCategoryMapper: RoomCategoryMapper, roomCategoryORM: RoomCategoryORM) {
        this.roomCategoryRepository = roomCategoryORM;
    }
    //room category
    async createRoomCategory(nameCategory: string, price: number, hotelId: number): Promise<any> {
        const roomCategory = await this.roomCategoryRepository.saveRoomCategory(nameCategory, price, hotelId);
        return roomCategory;
    }
    async getRoomCategory(roomCategoryId: number): Promise<any> {
        const roomCategory = await this.roomCategoryRepository.getRoomCategory(roomCategoryId);
        return roomCategory;
    }
    async getRoomCategories(hotelId: number): Promise<any> {
        const roomCategories = await this.roomCategoryRepository.getRoomCategories(hotelId);
        return roomCategories;
    }
    async getRoomCategoryModeledPort(roomCategoryId: number): Promise<any> {
        const roomCategory = await this.roomCategoryRepository.getRoomCategory(roomCategoryId);
        return new RoomCategoryDomainEntity(roomCategory.hotelId);
    }
    async updateCategoryRoom(nameCategory: string, price: number, roomCategoryId: number): Promise<any> {
        const roomCategory = await this.roomCategoryRepository.updateCategoryRoom(
            nameCategory,
            price,
            roomCategoryId,
        );
        return roomCategory;
    }
    async removeRoomCategory(roomCategoryId: number): Promise<any> {
        const roomCategory = await this.roomCategoryRepository.removeRoomCategory(roomCategoryId);
        return roomCategory;
    }
    async getRoomCategoryForRoomDomain(roomCategoryId: number): Promise<RoomDomain> {
        const roomCategory = await this.getRoomCategory(roomCategoryId);
        return this.RoomCategoryMapper.mapToRoomDomain(roomCategory);
    }
}
