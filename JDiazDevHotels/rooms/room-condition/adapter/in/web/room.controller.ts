import { Request, Response } from 'express'
import { Service } from "typedi";

import { CreateNewRoomCondtionRequest } from '../../../application/ports/in/create-new-room-condition.request';
import { CreateRoomConditionService } from '../../../application/services/create-room-condition.service';


@Service()
export class RoomConditionController {

    private createNewRoomConditionRequest:CreateNewRoomCondtionRequest

    constructor(
        createRoomConditionService:CreateRoomConditionService,
    ){
        this.createNewRoomConditionRequest = createRoomConditionService
    }
    
    createRoomCondition = async (req:Request, res:Response) => {
        const { nameCondition } = req.body

        const newRoomCondition = await this.createNewRoomConditionRequest.createNewRoomCondition(nameCondition)
        
        res.json(newRoomCondition) 
    }
    
}