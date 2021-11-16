import { Service } from 'typedi';
import { DailyReportHousting } from '../../domain/daily-report-housting';
import { DailyReportSales } from '../../domain/daily-report-sales';
import { DailyReportModel } from './daily-report.model';

@Service()
export class DailyReportMapper {
    mapForDailyReportHousting(dailyReport: DailyReportModel): DailyReportHousting {
        return new DailyReportHousting(dailyReport.id, dailyReport.moneyHousting, dailyReport.moneyTotal);
    }
    mapForDailyReportSales(dailyReport: DailyReportModel): DailyReportSales {
        return new DailyReportSales(dailyReport.id, dailyReport.moneySales, dailyReport.moneyTotal);
    }
}
