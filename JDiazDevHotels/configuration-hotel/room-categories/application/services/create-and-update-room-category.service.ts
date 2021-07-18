import { Service } from "typedi";

import { CreateRoomCategoryRequest } from '../ports/in/create-and-update-room-category.request';
import { CreateRoomCategoryPort } from "../ports/out/self-domain/create-room-category.port";
import { RoomCategoryPersistenceAdapter } from "../../adapter/out/persistence/room-category-persistence.adapter";
import { RoomCategoryCommand } from "../ports/in/room-category.command";
import { RoomCategoryDomainEntity } from "../../domain/room-category";
import { GetRoomCategoryModeledPort } from '../ports/out/self-domain/get-room-category-modeled.port';
import { UpdateRoomCategoryPort } from '../ports/out/self-domain/update-room-category.port';
import { UpdateRoomCategoryRequest } from '../ports/in/update-room-category.request';
import { GetHotelForRoomCategoryDomain } from '../ports/out/other-domain/get-hotel-for-room-category-domain';
import { GetHotelService } from '../../../../managament/hotels/application/services/get-hotel.service';

@Service()
export class CreateAndUpdateRoomCategoryService implements
    CreateRoomCategoryRequest,
    UpdateRoomCategoryRequest {

    //other domain
    private getHotelForRoomCategoryDomain: GetHotelForRoomCategoryDomain

    //self port
    private createRoomCategoryPort: CreateRoomCategoryPort
    private updateRoomCategoryPort: UpdateRoomCategoryPort
    private getRoomCategoryModeledPort: GetRoomCategoryModeledPort

    constructor(
        //other domain
        getHotelService: GetHotelService,

        //self domain
        roomCategoryPersistenceAdapter: RoomCategoryPersistenceAdapter
    ) {
        //other domain
        this.getHotelForRoomCategoryDomain = getHotelService

        //self ports
        this.createRoomCategoryPort = roomCategoryPersistenceAdapter
        this.updateRoomCategoryPort = roomCategoryPersistenceAdapter
        this.getRoomCategoryModeledPort = roomCategoryPersistenceAdapter
    }
    async createNewRoomCategory(nameCategory: string, hotelId: number): Promise<any> {
        const hotel = await this.getHotelForRoomCategoryDomain.getHotelForRoomCategoryDomain(hotelId)

        if (!hotel) {
            return { message: 'This hotel does not exists' }
        }

        const newRoomCategory = await this.createRoomCategoryPort.createRoomCategory(nameCategory, hotelId)
        return newRoomCategory
    }
    async updateTheRoomCategory(nameCategory: string, roomCategoryId: number, command: RoomCategoryCommand): Promise<any> {
        const roomCategory: RoomCategoryDomainEntity = await this.getRoomCategoryModeledPort.getRoomCategoryModeledPort(roomCategoryId)

        if (!roomCategory.checkIfRoomCategoryBelongsToHotel(command.getHotelId)) {
            return { message: 'You cannot update this room category' }
        }

        const roomCatgoryUpdated = await this.updateRoomCategoryPort.updateCategoryRoom(nameCategory, roomCategoryId)
        return roomCatgoryUpdated
    }
}

