import { Service } from "typedi";

import { CreateNewRoomCategoryRequest } from '../../../port/in/room/room-category/create-new-room-category.request';


import { HotelPersistenceAdapter } from '../../../../adapter/out/persistence/hotel/hotel-persistence.adapter';
import { CreateRoomCategoryPort } from "../../../port/out/room/room-category/create-room-category.port";
import { RoomCategoryPersistenceAdapter } from "../../../../adapter/out/persistence/room/room-category/room-category-persistence.adapter";

@Service()
export class CreateRoomCategorySerice implements CreateNewRoomCategoryRequest {
    private createRoomCategoryPort:CreateRoomCategoryPort
    
    constructor(
        private hotelPersistenceAdapter:HotelPersistenceAdapter, //it will be strong dependency
        roomCategoryPersistenceAdapter:RoomCategoryPersistenceAdapter
    ){
        this.createRoomCategoryPort = roomCategoryPersistenceAdapter
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

