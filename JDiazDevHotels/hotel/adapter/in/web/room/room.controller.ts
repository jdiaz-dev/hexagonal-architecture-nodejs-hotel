import { Request, Response } from 'express'
import { Service } from "typedi";

import { CreateNewRoomCategoryRequest } from '../../../../application/port/in/room/room-category/create-new-room-category.request';
import { CreateRoomCategorySerice } from '../../../../application/service/room/room-category/create-room-category.service';
import { CreateNewRoomCondtionRequest } from '../../../../application/port/in/room/room-condition/create-new-room-condition.request';
import { CreateRoomConditionService } from '../../../../application/service/room/room-condition/create-room-condition.service';
import { CreateNewRoomRequest } from '../../../../application/port/in/room/room/create-new-room.request';
import { CreateAndUpdateRoomService } from './../../../../application/service/room/room/create-room.service';
import { CreateNewRoomCommand } from '../../../../application/port/in/room/room/create-new-room.command';
import { RoomData } from './../../../../domain/room-data';
import { RoomEntity } from '../../../../domain/room';
import { GetRoomsRequest } from './../../../../application/port/in/room/room/get-rooms.request';
import { GetRoomsService } from './../../../../application/service/room/room/get-roooms.service';
import { UpdateTheRoomRequest } from './../../../../application/port/in/room/room/update-the-room-request';

@Service()
export class RoomController {
    private createNewRoomRequest:CreateNewRoomRequest
    private updateTheRoomRequest:UpdateTheRoomRequest

    private createNewRoomCategoryRequest:CreateNewRoomCategoryRequest
    private createNewRoomConditionRequest:CreateNewRoomCondtionRequest
    private getRoomsRequest:GetRoomsRequest

    constructor(
        createRoomCategorySerice:CreateRoomCategorySerice,
        createRoomConditionService:CreateRoomConditionService,
        createAndUpdateRoomService:CreateAndUpdateRoomService,
        getRoomsService:GetRoomsService
    ){
        this.createNewRoomRequest = createAndUpdateRoomService
        this.updateTheRoomRequest = createAndUpdateRoomService

        this.createNewRoomCategoryRequest = createRoomCategorySerice
        this.createNewRoomConditionRequest = createRoomConditionService
        this.getRoomsRequest = getRoomsService

        this.createRoomCategory = this.createRoomCategory.bind(this)
        this.createRoomCondition = this.createRoomCondition.bind(this)
        this.createRoom = this.createRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
    }
    async createRoomCategory(req:Request, res:Response){
        const { nameCategory } = req.body
        const { hotelId } = req.params

        const newRoomCategory = await this.createNewRoomCategoryRequest.createNewRoomCategory(nameCategory, parseInt(hotelId))

        res.json(newRoomCategory)
    }
    async createRoomCondition(req:Request, res:Response){
        const { nameCondition } = req.body

        const newRoomCondition = await this.createNewRoomConditionRequest.createNewRoomCondition(nameCondition)
        
        res.json(newRoomCondition) 
    }
    async createRoom(req:Request, res:Response){
        const { name, price, details } = req.body
        const { hotelId, levelId, categoryId } = req.params

        const dataRoom = new RoomEntity(

            // 0 : means without room
            new RoomData(0, name, parseInt(price), details, parseInt(levelId), parseInt(categoryId)),
            parseInt(hotelId)
        )
        const newRoom = await this.createNewRoomRequest.createNewRoom(
            new CreateNewRoomCommand( dataRoom )
        )
        
        res.json(newRoom) 
    }
    updateRoom = async (req:Request, res:Response) => {
        const { name, price, details } = req.body
        const { hotelId, levelId, categoryId, roomId } = req.params

        const dataRoom = new RoomEntity(
            new RoomData(parseInt(roomId), name, parseInt(price), details, parseInt(levelId), parseInt(categoryId)),
            parseInt(hotelId)
        )
        const roomUpdated = await this.updateTheRoomRequest.updateTheRoom(
            new CreateNewRoomCommand( dataRoom )
        )
        
        res.json(roomUpdated) 
    }

    async getRooms(req:Request, res:Response) {
        const { levelId } = req.params

        const rooms = await this.getRoomsRequest.getRoomsOfLevel(parseInt(levelId))
        res.json(rooms) 
    }
}