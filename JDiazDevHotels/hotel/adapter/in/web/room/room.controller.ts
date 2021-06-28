import { Request, Response } from 'express'
import { Service } from "typedi";

import { CreateNewRoomCategoryRequest } from './../../../../application/port/in/room/create-new-room-category.request';
import { CreateRoomCategorySerice } from './../../../../application/service/room/create-room-category.service';
import { CreateNewRoomCondtionRequest } from './../../../../application/port/in/room/create-new-room-condition.request';
import { CreateRoomConditionService } from './../../../../application/service/room/create-room-condtion.service';

@Service()
export class RoomController {
    private createNewRoomCategoryRequest:CreateNewRoomCategoryRequest
    private createNewRoomCondtionRequest:CreateNewRoomCondtionRequest

    constructor(
        createRoomCategorySerice:CreateRoomCategorySerice,
        createRoomConditionService:CreateRoomConditionService
    ){
        this.createNewRoomCategoryRequest = createRoomCategorySerice
        this.createNewRoomCondtionRequest = createRoomConditionService
    }
    async createRoomCategory(req:Request, res:Response){
        const { nameCategory } = req.body
        const { hotelId } = req.params

        const newRoomCategory = await this.createNewRoomCategoryRequest.createNewRoomCategory(nameCategory, parseInt(hotelId))

        res.json(newRoomCategory)
    }
    async createRoomCondition(req:Request, res:Response){
        const { nameCondtion } = req.body

        const newRoomCondition = await this.createNewRoomCondtionRequest.createNewRoomCondition(nameCondtion)
        
        res.json(newRoomCondition) 
    }
}