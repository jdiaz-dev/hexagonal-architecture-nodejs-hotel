import { Service } from "typedi";

import { GetHotelLevelsPort } from '../ports/out/get-hotel-levels.port';
import { LevelPersistenceAdpater } from '../../adapter/out/persistence/level-persistence.adapter';

import { GetHotelLevelsRequest } from "../ports/in/get-hotel-levels-request";
import { ValidateUserWithHotelPort } from "../../../../common/ports/in/validateUserWithHotel.port";
import { CommonValidator } from "../../../../common/validators/database-validator";
import { HotelLevelCommand } from "../ports/in/hotel-level.command";
import { GetLevelModeledPort } from "../ports/out/get-level-modeled.port";
import { LevelDomainEntity } from "../../domain/level";

@Service()
export class GetHotelLevelsService implements GetHotelLevelsRequest {
    private getLevelsPort:GetHotelLevelsPort
    private getLevelModeledPort:GetLevelModeledPort
        
    constructor(
        levelPersistenceAdpater:LevelPersistenceAdpater,
    ){
        this.getLevelsPort = levelPersistenceAdpater
        this.getLevelModeledPort = levelPersistenceAdpater

    }
    async getLevelsOfHotel(hotelId:number):Promise<any> {
        
        const levels = await this.getLevelsPort.getLevels(hotelId)
        return levels
    }


}