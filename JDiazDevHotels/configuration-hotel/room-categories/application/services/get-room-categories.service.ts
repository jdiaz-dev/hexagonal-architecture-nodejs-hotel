import { Service } from "typedi";
import { GetRoomCategoriesRequest } from '../ports/in/get-room-categories.request';
import { GetRoomCategoriesPort } from '../ports/out/self-domain/get-room-categories.port';
import { RoomCategoryORM } from '../../adapter/out/persistence/room-category.orm';
import { RoomCategoryPersistenceAdapter } from '../../adapter/out/persistence/room-category-persistence.adapter';

@Service()
export class GetRoomCategoriesService implements GetRoomCategoriesRequest {
    private getRoomCategoriesPort: GetRoomCategoriesPort

    constructor(roomCategoryPersistenceAdapter: RoomCategoryPersistenceAdapter) {
        this.getRoomCategoriesPort = roomCategoryPersistenceAdapter
    }
    async getTheRoomCategories(hotelId: number): Promise<any> {
        const roomCategories = await this.getRoomCategoriesPort.getRoomCategories(hotelId)
        return roomCategories
    }
}