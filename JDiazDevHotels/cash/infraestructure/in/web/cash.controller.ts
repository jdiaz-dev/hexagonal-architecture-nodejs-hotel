import { Service } from "typedi";
import { Request, Response } from 'express'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

import { CreateCashRequest } from "../../../application/ports/in/create-cash.request";
import { CreateCashService } from "../../../application/services/create-cash.service";
import { DataCash } from "../../../application/services/data-cash";
import { GetCashNotClosedRequest } from "../../../application/ports/in/get-cash-not-closed.request";
import { GetCashNotClosedService } from "../../../application/services/get-cash-not-closed.service";

@Service()
export class CashController {
    private createCashRequest: CreateCashRequest
    private getCashNotClosedRequest: GetCashNotClosedRequest

    constructor(
        createCashService: CreateCashService,
        getCashNotClosedService: GetCashNotClosedService
    ) {
        this.createCashRequest = createCashService
        this.getCashNotClosedRequest = getCashNotClosedService
    }
    createCash = async (req: Request, res: Response) => {
        const { hotelId } = req.params
        const { openingMoney, date, time } = req.body

        const cashCreated = await this.createCashRequest.createTheCash(
            parseInt(hotelId),
            new DataCash(
                parseInt(openingMoney),
                date,
                time,
                //dayjs(new Date()).utc(true).format()
            )
        )
        res.json(cashCreated)
    }
    getCashNotClosed = async (req: Request, res: Response) => {
        const { hotelId } = req.params

        const cashNotClosed = await this.getCashNotClosedRequest.getTheCashNotClosed(parseInt(hotelId))
        res.json(cashNotClosed)
    }

}