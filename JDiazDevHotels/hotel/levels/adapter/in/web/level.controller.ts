import { Request, Response } from 'express'
import { Service } from "typedi";
import { CreateNewHotelLevelRequest } from '../../../application/ports/in/create-new-hotel-level.request';
import { CreateHotelLevelService } from '../../../application/services/create-hotel-level.service';
import { GetHotelLevelsRequest } from '../../../application/ports/in/get-hotel-levels-request';
import { GetHotelLevelsService } from '../../../application/services/get-hotel-levels.service';
import { GetHotelLevelRequest } from '../../../application/ports/in/get-hotel-level.request';

@Service()
export class LevelController {
    private createNewHotelLevelRequest:CreateNewHotelLevelRequest
    private getHotelLevelsRequest:GetHotelLevelsRequest
    private getHotelLevelRequest:GetHotelLevelRequest

    constructor(
        createHotelLevelService:CreateHotelLevelService,
        getHotelLevelsService:GetHotelLevelsService,
    ){
        this.createNewHotelLevelRequest = createHotelLevelService 
        this.getHotelLevelsRequest = getHotelLevelsService
        this.getHotelLevelRequest = getHotelLevelsService
        
    }
    createLevel = async (req:Request|any, res:Response ) => {
        const { name } = req.body
        const { hotelId } = req.params

        const newLevel = await this.createNewHotelLevelRequest.createNewLevel(name, parseInt(hotelId), parseInt(req.user.id)) 
        res.json(newLevel)
    }
    getLevelsOfHotel = async(req:Request|any, res:Response) => { 
        const { hotelId } = req.params

        const levels = await this.getHotelLevelsRequest.getLevelsOfHotel(parseInt(req.user.id), parseInt(hotelId))
        res.json(levels)

    }
    /* getLevelOfHotel = async(req:Request|any, res:Response) => { 
        const { hotelLevelId } = req.params

        const levels = await this.getHotelLevelRequest.getLevelOfHotel(hotelLevelId)
        res.json(levels)

    } */

}