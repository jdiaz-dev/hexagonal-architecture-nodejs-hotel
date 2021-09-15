import { Service } from 'typedi';

import { GetRoomCategoryPort } from '../ports/out/self-domain/get-room-category.port';
import { RoomCategoryPersistenceAdapter } from '../../adapters/out/persistence/room-category-persistence.adapter';

@Service()
export class GetRoomCategoryService {
    private getRoomCategoryPort: GetRoomCategoryPort;

    constructor(roomCategoryPersistenceAdapter: RoomCategoryPersistenceAdapter) {
        this.getRoomCategoryPort = roomCategoryPersistenceAdapter;
    }
}
