import { Service } from "typedi";
import { Request, Response } from 'express'

import { CreateNewRoomCategoryRequest } from "../../../application/ports/in/create-new-room-category.request";
import { CreateRoomCategorySerice } from "../../../application/services/create-room-category.service";

@Service()
export class RoomCategoryController {
    private createNewRoomCategoryRequest:CreateNewRoomCategoryRequest

    constructor(
        createRoomCategorySerice:CreateRoomCategorySerice,
    ){
        this.createNewRoomCategoryRequest = createRoomCategorySerice
    }
    createRoomCategory = async (req:Request, res:Response) => {
        const { nameCategory } = req.body
        const { hotelId } = req.params

        const newRoomCategory = await this.createNewRoomCategoryRequest.createNewRoomCategory(nameCategory, parseInt(hotelId))

        res.json(newRoomCategory)
    }
}