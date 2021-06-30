import { Service } from "typedi";

import { GetHotelLevelsPort } from '../ports/out/get-hotel-levels.port';
import { LevelPersistenceAdpater } from '../../adapter/out/persistence/level-persistence.adapter';

import { GetHotelLevelsRequest } from "../ports/in/get-hotel-levels-request";
import { GetHotelLevelRequest } from "../ports/in/get-hotel-level.request";
import { ValidateUserWithHotelPort } from "../../../../common/ports/in/validateUserWithHotel.port";
import { CommonValidator } from "../../../../common/validators/database-validator";

@Service()
export class GetHotelLevelsService implements 
        GetHotelLevelsRequest,
        GetHotelLevelRequest {
    private getLevelsPort:GetHotelLevelsPort
    private validateUserWithHotelPort:ValidateUserWithHotelPort
    
    constructor(
        levelPersistenceAdpater:LevelPersistenceAdpater,

        //common validator
        commonValidator:CommonValidator
    ){
        this.getLevelsPort = levelPersistenceAdpater

        //common validator
        this.validateUserWithHotelPort = commonValidator
    }
    async getLevelsOfHotel(clientAppId:number, hotelId:number):Promise<any> {
        const validation = await this.validateUserWithHotelPort.checkIfHotelBelongsToClientApp(clientAppId, hotelId)

        if(!validation){
            return { message: 'You cannot access to these hotel levels'}
        }
        const levels = await this.getLevelsPort.getLevels(hotelId)
        return levels
    }
    async getLevelOfHotel(hotelLevelId:number):Promise<any> {
        const level = await this.getLevelsPort.getLevel(hotelLevelId)
        return level
    }

}