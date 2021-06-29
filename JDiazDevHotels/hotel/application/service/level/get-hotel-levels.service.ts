import { Service } from "typedi";

import { GetHotelLevelsPort } from '../../port/out/level/get-hotel-levels.port';
import { LevelPersistenceAdpater } from '../../../adapter/out/persistence/level/level-persistence.adapter';

import { GetHotelLevelsRequest } from "../../port/in/level/get-hotel-levels-request";
import { GetHotelLevelRequest } from "../../port/in/level/gel-hotel-level.request";

@Service()
export class GetHotelLevelsService implements 
        GetHotelLevelsRequest,
        GetHotelLevelRequest {
    private getLevelsPort:GetHotelLevelsPort
    
    constructor(levelPersistenceAdpater:LevelPersistenceAdpater){
        this.getLevelsPort = levelPersistenceAdpater
    }
    async getLevelsOfHotel(hotelId:number):Promise<any> {
        const levels = await this.getLevelsPort.getLevels(hotelId)
        return levels
    }
    async getLevelOfHotel(hotelLevelId:number):Promise<any> {
        const level = await this.getLevelsPort.getLevel(hotelLevelId)
        return level
    }

}