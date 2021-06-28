import { Request, Response } from 'express'
import { Service } from "typedi";
import { CreateNewLevelRequest } from './../../../../application/port/in/level/create-new-level.request';
import { CreateLevelService } from '../../../../application/service/level/create-level.service';

@Service()
export class LevelController {
    private createNewLevelRequest:CreateNewLevelRequest
    
    constructor(createLevelService:CreateLevelService){
        this.createNewLevelRequest = createLevelService 
    }
    createLevel = async (req:Request|any, res:Response ) => {
        const { name } = req.body
        const { hotelId } = req.params

        const newLevel = await this.createNewLevelRequest.createNewLevel(name, parseInt(hotelId), parseInt(req.user.id)) 
        res.json(newLevel)
    }
}