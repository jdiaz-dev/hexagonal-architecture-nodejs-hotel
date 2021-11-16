import { Service } from 'typedi';
import { DailyReportPersistenceAdapter } from '../../adapters/out/daily-report-persistence.adapter';
import { DailyReportSales } from '../../domain/daily-report-sales';
import { IAddMoneyToDailyReportDueSalesUseCase } from '../ports/in/add-money-to-daily-report-due-sales.port';
import { IGetDailyReportWithMoneySalesPort } from '../ports/out/self-domain/get-daily-report-with-money-sales.port';
import { IUpdateMoneyTotalDueSalesPort } from '../ports/out/self-domain/update-money-total-due-sales.port';

@Service()
export class AddMoneyToDailyReportDueSalesService implements IAddMoneyToDailyReportDueSalesUseCase {
    private getDailyReportWithMoneySales: IGetDailyReportWithMoneySalesPort;
    private updateMoneyTotalDueSales: IUpdateMoneyTotalDueSalesPort;

    constructor(dailyReportPersistenceAdapter: DailyReportPersistenceAdapter) {
        this.getDailyReportWithMoneySales = dailyReportPersistenceAdapter;
        this.updateMoneyTotalDueSales = dailyReportPersistenceAdapter;
    }
    async addMoneyDueSales(hotelId: number, cashId: number, moneyToAdd: number) {
        console.log('-----------------moneyToAdd', moneyToAdd);
        const dailyReport: DailyReportSales = await this.getDailyReportWithMoneySales.getDailyReportWithMoneySales(
            hotelId,
            cashId,
        );

        dailyReport.addMoneyToSales(moneyToAdd);
        this.updateMoneyTotalDueSales.updateMoneyTotalDueSales(dailyReport);
    }
}
