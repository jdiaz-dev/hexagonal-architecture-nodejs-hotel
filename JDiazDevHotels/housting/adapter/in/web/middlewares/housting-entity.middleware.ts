import { Service } from "typedi";
import { Request, Response, NextFunction} from 'express'

import { GetHoustingModeledForMiddleware } from '../interfaces/get-housting-modeled-for-middleware';
import { GetHoustingService } from '../../../../application/services/get-housting.service';
import { HoustingDomainEntity } from "../../../../domain/housting";

@Service()
export class HoustingEntityMiddleware  {
    private getHoustingModeledForMiddleware:GetHoustingModeledForMiddleware

    constructor(getHoustingService:GetHoustingService){
        this.getHoustingModeledForMiddleware = getHoustingService

    }
    checkIfHoustingDomainEntityIsCompliment = async (req:Request|any, res:Response, next:NextFunction) => {
        const { cashId, houstingId, clientId, roomId } = req.params
        const houstingModeled:HoustingDomainEntity = await this.getHoustingModeledForMiddleware.getHoustingModeledForMiddleware(houstingId) 
        
        if( ! houstingModeled.checkIfCashBelongsToHousting(parseInt(cashId)) ){
            return res.json({ message: 'You cannot access to this housting, problem with cash'})
        }

        if( ! houstingModeled.checkIfClientBelongsToHousting(parseInt(clientId)) ){
            return res.json({ message: 'You cannot access to this housting, problem with client'})
        }

        if( ! houstingModeled.checkIfRoomBelongsToHousting(parseInt(roomId)) ){
            return res.json({ message: 'You cannot access to this housting, problem with room'})
        }

        next()
    }
}