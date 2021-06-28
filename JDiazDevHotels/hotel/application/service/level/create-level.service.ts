import { Service } from "typedi";

import { CreateNewLevelRequest } from '../../port/in/level/create-new-level.request';
import { CreateLevelPort } from '../../port/out/level/create-level.port';
import { LevelPersistenceAdpater } from '../../../adapter/out/persistence/level/level-persistence.adapter';
import { GetHotelPort } from "../../port/out/hotel/get-hotel.port";
import { HotelPersistenceAdapter } from './../../../adapter/out/persistence/hotel/hotel-persistence.adapter';

@Service()
export class CreateLevelService implements CreateNewLevelRequest {
    private createLevelPort:CreateLevelPort
    private getHotelPort:GetHotelPort

    constructor(
        levelPersistenceAdpater:LevelPersistenceAdpater,
        hotelPersistenceAdapter:HotelPersistenceAdapter
    ){
        this.createLevelPort = levelPersistenceAdpater
        this.getHotelPort = hotelPersistenceAdapter
    }
    async createNewLevel(nameLevel:string, hotelId:number, clientId:number):Promise<any>{

        const hotel = await this.getHotelPort.findHotel(hotelId)

        if(!hotel){
            return { message: 'This hotel does not exists' }
        }

        if(clientId !== hotel.user.id){
            return { message: 'It is impossible to assign an level for this hotel' }
        }

        const level = await this.createLevelPort.createLevel(nameLevel, hotel.id)
        return level
    }
}