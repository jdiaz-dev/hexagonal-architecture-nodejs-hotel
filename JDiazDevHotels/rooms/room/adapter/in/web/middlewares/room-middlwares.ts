import { Service } from "typedi";
import { Request, Response, NextFunction } from 'express'

import { GetRoomConditionService } from './../../../../../room-condition/application/services/get-room-condition.service';
import { GetRoomConditionForRooomMiddelware } from './../interfaces/get-room-condition-for-room-middleware';

@Service()
export class RoomMiddlewares {
    private getRoomConditionForRooomMiddleware: GetRoomConditionForRooomMiddelware

    constructor(getRoomConditionService: GetRoomConditionService) {
        this.getRoomConditionForRooomMiddleware = getRoomConditionService
    }
    checkIfRoomConditionExists = async (req: Request | any, res: Response, next: NextFunction) => {
        const { roomConditionId } = req.params

        const roomCodition = await this.getRoomConditionForRooomMiddleware.getRoomConditionForRooomMiddleware(parseInt(roomConditionId))

        if (!roomCodition) {
            return res.json({ message: 'This room condition does not exist' })
        }
        next()
    }
}