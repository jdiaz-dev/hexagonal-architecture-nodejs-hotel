import { Service } from "typedi";
import { Request, Response } from 'express'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

import { CreateCashRequest } from "../../../application/ports/in/create-cash.request";
import { CreateCashService } from "../../../application/services/create-cash.service";
import { DataCash } from "../../../application/services/data-cash";

//let now = dayjs()

@Service()
export class CashController {
    private createCashRequest:CreateCashRequest
    
    constructor(
        createCashService:CreateCashService

    ){
        this.createCashRequest = createCashService
    }
    createCash = async (req:Request|any, res:Response) => {
        const { hotelId } = req.params
        const { openingMoney } = req.body

        const cashCreated = await this.createCashRequest.createTheCash(
            parseInt(hotelId), 
            new DataCash(parseInt(openingMoney), dayjs(new Date()).utc(true).format())
        )

        res.json(cashCreated)
    }

}