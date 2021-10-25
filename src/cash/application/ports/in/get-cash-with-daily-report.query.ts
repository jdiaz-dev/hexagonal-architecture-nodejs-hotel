import { IQueries } from '../../../../shared/interfaces/query.interface';

export interface IGetCashWithDailyReportQuery {
    getTheCashWithDailyReport(hotelId: number, queries: IQueries): Promise<any>;
}
