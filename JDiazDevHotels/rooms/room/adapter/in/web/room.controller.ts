import { Service } from "typedi";
import { Request, Response } from 'express'

import { CreateNewRoomRequest } from "../../../application/ports/in/create-new-room.request";
import { GetRoomsRequest } from "../../../application/ports/in/get-rooms.request";
import { UpdateTheRoomRequest } from "../../../application/ports/in/update-the-room-request";
import { CreateAndUpdateRoomService } from "../../../application/services/create-and-update-room.service";
import { GetRoomsService } from "../../../application/services/get-roooms.service";
import { RoomData } from "../../../application/services/room-data";
import { RoomCommand } from "../../../application/ports/in/room.command";
import { RemoveTheRoomRequest } from './../../../application/ports/in/remove-the-room.request';
import { RemoveRoomService } from './../../../application/services/remove-room.service';
import { RoomWithLevelCommand } from "../../../application/ports/in/room-with-level.domain";

@Service()
export class RoomController {
    private createNewRoomRequest:CreateNewRoomRequest
    private updateTheRoomRequest:UpdateTheRoomRequest
    private getRoomsRequest:GetRoomsRequest
    private removeTheRoomRequest:RemoveTheRoomRequest

    constructor(
        createAndUpdateRoomService:CreateAndUpdateRoomService,
        getRoomsService:GetRoomsService,
        removeRoomService:RemoveRoomService
    ){
        this.createNewRoomRequest = createAndUpdateRoomService
        this.updateTheRoomRequest = createAndUpdateRoomService
        this.getRoomsRequest = getRoomsService
        this.removeTheRoomRequest = removeRoomService 
    }
    createRoom = async(req:Request|any, res:Response) => {
        const { name, price, details } = req.body
        const { hotelId, levelId, categoryId } = req.params

        const newRoom = await this.createNewRoomRequest.createNewRoom(
            new RoomCommand( parseInt(hotelId) ), 
            
            // 0 : means without room
            new RoomData(0, name, parseInt(price), details, parseInt(levelId), parseInt(categoryId)),
        )
        
        res.json(newRoom) 
    }
    updateRoom = async (req:Request|any, res:Response) => {
        const { name, price, details } = req.body
        const { hotelId, levelId, categoryId, roomId } = req.params

        const roomUpdated = await this.updateTheRoomRequest.updateTheRoom(
            new RoomCommand( parseInt(hotelId) ),
            new RoomData(parseInt(roomId), name, parseInt(price), details, parseInt(levelId), parseInt(categoryId)) 
        )
        
        res.json(roomUpdated) 
    }
    getRooms = async (req:Request|any, res:Response) => {
        const { hotelId, levelId } = req.params

        const rooms = await this.getRoomsRequest.getRoomsOfLevel(
            parseInt(levelId), new RoomCommand( parseInt(hotelId))
        )
        res.json(rooms) 
    }
    removeRoom = async (req:Request|any, res:Response) => {
        const { hotelId, levelId, roomId } = req.params

        const roomRemoved = await this.removeTheRoomRequest.removeTheRoom(
            parseInt(levelId), 
            parseInt(roomId), 
            new RoomCommand( parseInt(hotelId)),
            new RoomWithLevelCommand( parseInt(levelId))

        )
        res.json(roomRemoved) 
    }
}