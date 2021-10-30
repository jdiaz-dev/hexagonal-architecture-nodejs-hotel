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
import { IGetCashWithDailyReportQuery } from '../../../application/ports/in/get-cash-with-daily-report.query';
import { CashPersistenceAdapter } from '../../out/persistence/cash-persitence.adapter';
import { SETTINGS } from '../../../../shared/settings/settings';
import { IQueries } from '../../../../shared/interfaces/query.interface';
import { ICloseCashQuery } from '../../../application/ports/in/close-cash.query';

@Service()
export class CashController {
    private createCashRequest: CreateCashRequest;
    private getCashNotClosedRequest: GetCashNotClosedRequest;
    private createDailyReportQuery: ICreateDailyReportQuery;
    private getCashWithDailyReportQuery: IGetCashWithDailyReportQuery;
    private closeCashQuery: ICloseCashQuery;

    constructor(
        createCashService: CreateCashService,
        getCashNotClosedService: GetCashNotClosedService,
        dailyReportPersistenceAdapter: DailyReportPersistenceAdapter,
        cashPersistenceAdapter: CashPersistenceAdapter,
    ) {
        this.createCashRequest = createCashService;
        this.getCashNotClosedRequest = getCashNotClosedService;
        this.createDailyReportQuery = dailyReportPersistenceAdapter;

        //persistence
        this.getCashWithDailyReportQuery = cashPersistenceAdapter;
        this.closeCashQuery = cashPersistenceAdapter;
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
        const cashNotClosed = await this.getCashNotClosedRequest.getTheCashNotClosed(parseInt(hotelId));
        res.json(cashNotClosed);
    };

    getCashWithDailyReport = async (req: Request, res: Response) => {
        const { hotelId } = req.params;
        const {
            limit = SETTINGS.base.queries.limit,
            offset = SETTINGS.base.queries.offset,
            orderby = SETTINGS.base.queries.orderBy,
        } = req.query as unknown as IQueries;

        const queries: IQueries = {
            limit: Number(limit),
            offset: Number(offset),
            orderby,
        };

        console.log('----------------cash with report ', hotelId);
        const cashWithDailyReport = await this.getCashWithDailyReportQuery.getTheCashWithDailyReport(
            parseInt(hotelId),
            queries,
        );
        res.json(cashWithDailyReport);
    };
    closeCash = async (req: Request, res: Response) => {
        const { cashId } = req.params;
        const cashClosed = await this.closeCashQuery.closeTheCash(parseInt(cashId));
        res.json(cashClosed);
    };
}
