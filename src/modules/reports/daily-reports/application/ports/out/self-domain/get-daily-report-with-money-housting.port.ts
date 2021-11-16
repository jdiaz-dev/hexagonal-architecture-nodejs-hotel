import { DailyReportHousting } from '../../../../domain/daily-report-housting';

export interface IGetDailyReportWithMoneyHoustingPort {
    getDailyReportWithMoneyHousting(hotelId: number, cashId: number): Promise<DailyReportHousting>;
}
