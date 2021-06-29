import { Service } from "typedi";

import { GetHotelLevelsPort } from '../ports/out/get-hotel-levels.port';
import { LevelPersistenceAdpater } from '../../adapter/out/persistence/level-persistence.adapter';

import { GetHotelLevelsRequest } from "../ports/in/get-hotel-levels-request";
import { GetHotelLevelRequest } from "../ports/in/gel-hotel-level.request";

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