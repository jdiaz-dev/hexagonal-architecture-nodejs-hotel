import { Service } from "typedi";
import { Request, Response } from 'express'
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'

import { CreateHoustingService } from './../../../application/services/create-housting.service';
import { CreateHoustingRequest } from './../../../application/ports/in/create-housting.request';
import { DataHousting } from "../../../application/services/data-housting";
import { GetHoustingRequest } from './../../../application/ports/in/get-housting-request';
import { GetHoustingService } from './../../../application/services/get-housting.service';
import { HoustingCommand } from "../../../application/ports/in/housting.command";
import { UpdateMoneyPaidService } from './../../../application/services/update-money-paid.service';
import { UpdateMoneyPaidUseCase } from './../../../application/ports/in/update-money-paid-use-case';
import { FinishHoustingUseCase } from './../../../application/ports/in/finish-housting';
import { UpdateFinishHoustingService } from '../../../application/services/update-finish-housting.service';

dayjs.extend(utc)

@Service()
export class HoustingController {
    private createHoustingRequest:CreateHoustingRequest
    private getHoustingRequest:GetHoustingRequest
    private updateMoneyPaidUseCase:UpdateMoneyPaidUseCase
    private finishHoustingUseCase:FinishHoustingUseCase
    
    constructor(
        createHoustingService:CreateHoustingService,
        getHoustingService:GetHoustingService,
        updateMoneyPaidService:UpdateMoneyPaidService,
        updateFinishHoustingService:UpdateFinishHoustingService
    ){
        this.createHoustingRequest = createHoustingService
        this.getHoustingRequest = getHoustingService
        this.updateMoneyPaidUseCase = updateMoneyPaidService
        this.finishHoustingUseCase = updateFinishHoustingService
    }
    createHousting = async (req:Request, res:Response) => {
        const { cashId, clientId, roomId } = req.params
        const {  price, moneyPaid, entryDate } = req.body

        const newHousting = await this.createHoustingRequest.createTheHousting(
            parseInt(cashId), 
            parseInt(clientId), 
            parseInt(roomId), 
            new DataHousting(
                parseInt(price), 
                parseInt(moneyPaid), 
                dayjs(new Date()).utc(true).format() 
            ) 
        )
        res.json(newHousting)
    }
    getHousting = async (req:Request, res:Response) => {
        const { houstingId } = req.params

        const housting = await this.getHoustingRequest.getTheHousting( parseInt(houstingId) )
            
        res.json(housting)
    }
    updateMoneyPaid = async (req:Request, res:Response) => {
        const { houstingId } = req.params
        const { moneyToAdd } = req.body

        const newMoneyPaid = await this.updateMoneyPaidUseCase.updateMoneyPaid( 
            parseInt(houstingId), 
            parseInt(moneyToAdd) 
        )
            
        res.json(newMoneyPaid)
    }
    updateFinish = async (req:Request, res:Response) => {
        const { houstingId } = req.params

        const houstingFinished = await this.finishHoustingUseCase.finishHousting( 
            parseInt(houstingId)
        )
            
        res.json(houstingFinished)
    }

}