import { Service } from "typedi";

import { CreateNewRoomCategoryRequest } from '../../port/in/room/create-new-room-category.request';

import { RoomPersistenceAdapter } from '../../../adapter/out/persistence/room/room-persistence.adapter';
import { HotelPersistenceAdapter } from '../../../adapter/out/persistence/hotel/hotel-persistence.adapter';
import { CreateRoomCategoryPort } from "../../port/out/room/create-room-category.port";

@Service()
export class CreateRoomCategorySerice implements CreateNewRoomCategoryRequest {
    private createRoomCategoryPort:CreateRoomCategoryPort
    
    constructor(
        private hotelPersistenceAdapter:HotelPersistenceAdapter, //it will be strong dependency
        roomPersistenceAdapter:RoomPersistenceAdapter
    ){
        this.createRoomCategoryPort = roomPersistenceAdapter
    }
    async createNewRoomCategory(nameCategory:string, hotelId:number):Promise<any>{
        const hotel = await this.hotelPersistenceAdapter.findHotel(hotelId)

        if(!hotel){
            return { message: 'This hotel does not exists' }
        }

        const newRoomCategory = await this.createRoomCategoryPort.createRoomCategory(nameCategory,hotelId)
        return newRoomCategory
    }
}

