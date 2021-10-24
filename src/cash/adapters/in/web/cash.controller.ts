import { Service } from 'typedi';
import { Request, Response } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { CreateCashRequest } from '../../../application/ports/in/create-cash.request';
import { CreateCashService } from '../../../application/services/create-cash.service';
import { DataCash } from '../../../application/services/data-cash';
import { GetCashNotClosedRequest } from '../../../application/ports/in/get-cash-not-closed.request';
import { GetCashNotClosedService } from '../../../application/services/get-cash-not-closed.service';
import { ICreateDailyReportQuery } from '../../../../reports/daily-reports/application/ports/in/create-daily-report-request.';
import { DailyReportPersistenceAdapter } from '../../../../reports/daily-reports/adapters/out/daily-report-persistence.adapter';

@Service()
export class CashController {
    private createCashRequest: CreateCashRequest;
    private getCashNotClosedRequest: GetCashNotClosedRequest;
    private createDailyReportQuery: ICreateDailyReportQuery;

    constructor(
        createCashService: CreateCashService,
        getCashNotClosedService: GetCashNotClosedService,
        dailyReportPersistenceAdapter: DailyReportPersistenceAdapter,
    ) {
        this.createCashRequest = createCashService;
        this.getCashNotClosedRequest = getCashNotClosedService;
        this.createDailyReportQuery = dailyReportPersistenceAdapter;
    }
    createCash = async (req: Request, res: Response) => {
        const { hotelId } = req.params;
        const { openingMoney, date, time } = req.body;
        const _hotelId = parseInt(hotelId);

        const cashCreated = await this.createCashRequest.createTheCash(
            _hotelId,
            new DataCash(
                parseInt(openingMoney),
                date,
                time,
                //dayjs(new Date()).utc(true).format()
            ),
        );
        this.createDailyReportQuery.createTheDailyReport(_hotelId, cashCreated.id);
        res.json(cashCreated);
    };
    getCashNotClosed = async (req: Request, res: Response) => {
        const { hotelId } = req.params;
        console.log('----------------cash ', hotelId);
        const cashNotClosed = await this.getCashNotClosedRequest.getTheCashNotClosed(parseInt(hotelId));
        res.json(cashNotClosed);
    };
}
