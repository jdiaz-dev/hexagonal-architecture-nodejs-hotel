import { DailyReportHousting } from '../../domain/daily-report-housting';
import { DailyReportSales } from '../../domain/daily-report-sales';

export interface IDailyReportRepository {
    createDailyReport(hotelId: number, cashId: number): void;
    getDailyReport(hotelId: number, cashId: number): Promise<any>;
    updateMoneyTotalDueHousting(dailyReportHousting: DailyReportHousting): Promise<any>;
    updateMoneyTotalDueSales(dailyReportSales: DailyReportSales): Promise<any>;
}
