import { Service } from "typedi";
import { Request, Response } from 'express'

import { CreateRoomCategoryRequest } from "../../../application/ports/in/create-and-update-room-category.request";
import { CreateAndUpdateRoomCategoryService } from "../../../application/services/create-and-update-room-category.service";
import { GetRoomCategoriesRequest } from './../../../application/ports/in/get-room-categories.request';
import { GetRoomCategoriesService } from './../../../application/services/get-room-categories.service';
import { UpdateRoomCategoryRequest } from './../../../application/ports/in/update-room-category.request';
import { RoomCategoryCommand } from "../../../application/ports/in/room-category.command";
import { RemoveRoomCategoryRequest } from './../../../application/ports/in/remove-room-category.request';
import { RemoveRoomCategoryService } from './../../../application/services/remove-room-category.service';

@Service()
export class RoomCategoryController {
    private createRoomCategoryRequest:CreateRoomCategoryRequest
    private updateRoomCategoryRequest:UpdateRoomCategoryRequest
    private getRoomCategoriesRequest:GetRoomCategoriesRequest
    private removeRoomCategoryRequest:RemoveRoomCategoryRequest

    constructor(
        createAndUpdateRoomCategoryService:CreateAndUpdateRoomCategoryService,
        getRoomCategoriesService:GetRoomCategoriesService,
        removeRoomCategoryService:RemoveRoomCategoryService
    ){
        this.createRoomCategoryRequest = createAndUpdateRoomCategoryService
        this.updateRoomCategoryRequest = createAndUpdateRoomCategoryService
        this.getRoomCategoriesRequest = getRoomCategoriesService
        this.removeRoomCategoryRequest = removeRoomCategoryService
    }
    createRoomCategory = async (req:Request, res:Response) => {
        const { nameCategory } = req.body
        const { hotelId } = req.params

        const newRoomCategory = await this.createRoomCategoryRequest.createNewRoomCategory(nameCategory, parseInt(hotelId))

        res.json(newRoomCategory)
    }
    getRoomCategories = async (req:Request, res:Response) => {
        const { hotelId } = req.params

        const roomCategories = await this.getRoomCategoriesRequest.getTheRoomCategories(parseInt(hotelId))

        res.json(roomCategories)
    }
    updateRoomCategory = async (req:Request, res:Response) => {
        const { nameCategory } = req.body
        const { hotelId, roomCategoryId } = req.params

        const newRoomCategory = await this.updateRoomCategoryRequest.updateTheRoomCategory(nameCategory, parseInt(roomCategoryId), new RoomCategoryCommand(parseInt(hotelId)) )

        res.json(newRoomCategory)
    }
    removeRoomCategory = async (req:Request, res:Response) => {
        const { hotelId, roomCategoryId } = req.params

        const roomCategoryRemoved = await this.removeRoomCategoryRequest.removeTheRoomCategory(
            parseInt(roomCategoryId),
            new RoomCategoryCommand(parseInt(hotelId))
        )

        res.json(roomCategoryRemoved)
    }
    
}