import { Service } from "typedi";

import { CreateNewHotelLevelRequest } from '../../port/in/level/create-new-hotel-level.request';
import { CreateLevelPort } from '../../port/out/level/create-level.port';
import { LevelPersistenceAdpater } from '../../../adapter/out/persistence/level/level-persistence.adapter';
import { GetHotelPort } from "../../port/out/hotel/get-hotel.port";
import { HotelPersistenceAdapter } from '../../../adapter/out/persistence/hotel/hotel-persistence.adapter';
import { ValidateUserWithHotelPort } from '../../../../common/ports/in/validateUserWithHotel.port';
import { DatabaseValidator } from '../../../../common/validators/database-validator';

@Service()
export class CreateHotelLevelService implements CreateNewHotelLevelRequest {
    private createLevelPort:CreateLevelPort
    private getHotelPort:GetHotelPort
    private validateUserWithHotelPort:ValidateUserWithHotelPort

    constructor(
        levelPersistenceAdpater:LevelPersistenceAdpater,
        hotelPersistenceAdapter:HotelPersistenceAdapter,

        //database validator
        databaseValidator:DatabaseValidator
    ){
        this.createLevelPort = levelPersistenceAdpater
        this.getHotelPort = hotelPersistenceAdapter

        //database validator
        this.validateUserWithHotelPort = databaseValidator
    }
    async createNewLevel(nameLevel:string, hotelId:number, clientId:number):Promise<any>{

        const hotel = await this.getHotelPort.findHotel(hotelId)

        if(!hotel)
        return { message: 'This hotel does not exists' }
        
        const validation = await this.validateUserWithHotelPort.isValidUserWithHotel(clientId, hotelId)

        if(!validation)
        return { message: 'It is impossible to assign an level for this hotel' }
        
        const level = await this.createLevelPort.createLevel(nameLevel, hotel.id)
        return level
    }
}