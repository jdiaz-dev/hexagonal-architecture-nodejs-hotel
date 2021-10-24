import { DailyReportSales } from '../../../../domain/daily-report-sales';

export interface IGetDailyReportWithMoneySalesPort {
    getDailyReportWithMoneySales(hotelId: number, cashId: number): Promise<DailyReportSales>;
}
