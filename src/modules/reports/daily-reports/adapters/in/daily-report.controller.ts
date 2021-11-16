import { Service } from 'typedi';
import { Request, Response } from 'express';
import { IGetDailyReportRequest } from '../../application/ports/in/get-daily-report.request';
import { DailyReportPersistenceAdapter } from '../out/daily-report-persistence.adapter';

@Service()
export class DailyReportController {
    private getDailyReportRequest: IGetDailyReportRequest;
    constructor(dailyReportPersistenceAdapter: DailyReportPersistenceAdapter) {
        this.getDailyReportRequest = dailyReportPersistenceAdapter;
    }
    getDailyReport = async (req: Request, res: Response) => {
        const { hotelId, cashId } = req.params;
        const productsSaled = await this.getDailyReportRequest.getTheDailyReport(
            parseInt(hotelId),
            parseInt(cashId),
        );
        res.json(productsSaled);
    };
}
