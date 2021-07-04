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

dayjs.extend(utc)

@Service()
export class HoustingController {
    private createHoustingRequest:CreateHoustingRequest
    private getHoustingRequest:GetHoustingRequest
    
    constructor(
        createHoustingService:CreateHoustingService,
        getHoustingService:GetHoustingService
    ){
        this.createHoustingRequest = createHoustingService
        this.getHoustingRequest = getHoustingService
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
        const { houstingId, cashId, clientId, roomId } = req.params

        const housting = await this.getHoustingRequest.getTheHousting(
            parseInt(houstingId),
            new HoustingCommand(parseInt(cashId), parseInt(clientId), parseInt(roomId)))
            
        res.json(housting)
    }


}