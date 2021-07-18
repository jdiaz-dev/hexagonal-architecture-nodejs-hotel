import { Service } from "typedi";
import { RemoveRoomCategoryRequest } from '../ports/in/remove-room-category.request';
import { RemoveRoomCategoryPort } from '../ports/out/self-domain/remove-room-categoy.port';
import { RoomCategoryPersistenceAdapter } from '../../adapter/out/persistence/room-category-persistence.adapter';
import { RoomCategoryCommand } from "../ports/in/room-category.command";
import { RoomCategoryDomainEntity } from "../../domain/room-category";
import { GetRoomCategoryModeledPort } from "../ports/out/self-domain/get-room-category-modeled.port";

@Service()
export class RemoveRoomCategoryService implements RemoveRoomCategoryRequest {
    private removeRoomCategoryPort: RemoveRoomCategoryPort
    private getRoomCategoryModeledPort: GetRoomCategoryModeledPort

    constructor(
        roomCategoryPersistenceAdapter: RoomCategoryPersistenceAdapter
    ) {
        this.removeRoomCategoryPort = roomCategoryPersistenceAdapter
        this.getRoomCategoryModeledPort = roomCategoryPersistenceAdapter
    }
    async removeTheRoomCategory(roomCategoryId: number, command: RoomCategoryCommand): Promise<any> {
        const roomCategory: RoomCategoryDomainEntity = await this.getRoomCategoryModeledPort.getRoomCategoryModeledPort(roomCategoryId)

        if (!roomCategory.checkIfRoomCategoryBelongsToHotel(command.getHotelId)) {
            return { message: 'You cannot remove this room category' }
        }

        const roomCategoryRemoved = await this.removeRoomCategoryPort.removeRoomCategory(roomCategoryId)
        if (roomCategoryRemoved.state !== false) {
            return { message: 'An error trying to remove the room category has happened' }
        }
        return { message: 'Room category removed successly' }
    }
}