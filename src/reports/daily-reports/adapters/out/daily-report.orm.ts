import { Service } from 'typedi';
import { DailyReportHousting } from '../../domain/daily-report-housting';
import { DailyReportSales } from '../../domain/daily-report-sales';
import { DailyReportModel } from './daily-report.model';
import { IDailyReportRepository } from './daily-report.repository';

@Service()
export class DailyReportSequelize implements IDailyReportRepository {
    createDailyReport(hotelId: number, cashId: number): void {
        try {
            const dailyReport = new DailyReportModel();
            dailyReport.hotelId = hotelId;
            dailyReport.cashId = cashId;
            dailyReport.save();
        } catch (error) {
            console.log('---------------', error);
        }
    }
    async getDailyReport(hotelId: number, cashId: number): Promise<any> {
        try {
            const dailyReport = await DailyReportModel.findOne({
                where: { hotelId, cashId },
                attributes: ['id', 'moneyHousting', 'moneySales', 'moneyTotal'],
            });
            return dailyReport;
        } catch (error) {
            console.log('---------------', error);
        }
    }

    async updateMoneyTotalDueHousting(_dailyReport: DailyReportHousting): Promise<any> {
        try {
            const dailyReport: any = await DailyReportModel.findOne({
                where: { id: _dailyReport.getdailyReportId },
            });
            dailyReport.moneyHousting = _dailyReport.getMoneyHousting;
            dailyReport.moneyTotal = _dailyReport.getMoneyTotal;
            await dailyReport.save();
            return dailyReport;
        } catch (error) {
            console.log('---------------', error);
        }
    }
    async updateMoneyTotalDueSales(_dailyReport: DailyReportSales): Promise<any> {
        try {
            const dailyReport: any = await DailyReportModel.findOne({
                where: { id: _dailyReport.getdailyReportId },
            });
            dailyReport.moneySales = _dailyReport.getMoneySales;
            dailyReport.moneyTotal = _dailyReport.getMoneyTotal;
            await dailyReport.save();
            return dailyReport;
        } catch (error) {
            console.log('---------------', error);
        }
    }
}
