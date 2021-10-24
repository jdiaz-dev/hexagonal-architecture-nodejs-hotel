import { DailyReportSales } from '../../../../domain/daily-report-sales';

export interface IUpdateMoneyTotalDueSalesPort {
    updateMoneyTotalDueSales(dailyReportSales: DailyReportSales): void;
}
