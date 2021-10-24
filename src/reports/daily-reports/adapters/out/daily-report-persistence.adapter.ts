import { Service } from 'typedi';
import { ICreateDailyReportQuery } from '../../application/ports/in/create-daily-report-request.';
import { IGetDailyReportRequest } from '../../application/ports/in/get-daily-report.request';
import { IGetDailyReportWithMoneyHoustingPort } from '../../application/ports/out/self-domain/get-daily-report-with-money-housting.port';
import { IGetDailyReportWithMoneySalesPort } from '../../application/ports/out/self-domain/get-daily-report-with-money-sales.port';
import { IUpdateMoneyTotalDueHoustingPort } from '../../application/ports/out/self-domain/update-money-total-due-housting.port';
import { IUpdateMoneyTotalDueSalesPort } from '../../application/ports/out/self-domain/update-money-total-due-sales.port';
import { DailyReportHousting } from '../../domain/daily-report-housting';
import { DailyReportSales } from '../../domain/daily-report-sales';
import { DailyReportMapper } from './daily-report.mapper';
import { DailyReportSequelize } from './daily-report.orm';
import { IDailyReportRepository } from './daily-report.repository';

@Service()
export class DailyReportPersistenceAdapter
    implements
        ICreateDailyReportQuery,
        IGetDailyReportWithMoneyHoustingPort,
        IGetDailyReportWithMoneySalesPort,
        IUpdateMoneyTotalDueHoustingPort,
        IUpdateMoneyTotalDueSalesPort,
        IGetDailyReportRequest
{
    private dailyReportRepository: IDailyReportRepository;

    constructor(private dailyReportMapper: DailyReportMapper, dailyReportSequelize: DailyReportSequelize) {
        this.dailyReportRepository = dailyReportSequelize;
    }
    createTheDailyReport(hotelId: number, cashId: number): void {
        this.dailyReportRepository.createDailyReport(hotelId, cashId);
    }
    async getTheDailyReport(hotelId: number, cashId: number): Promise<any> {
        return await this.dailyReportRepository.getDailyReport(hotelId, cashId);
    }
    async getDailyReportWithMoneyHousting(hotelId: number, cashId: number): Promise<DailyReportHousting> {
        const dailyReport = await this.dailyReportRepository.getDailyReport(hotelId, cashId);
        return this.dailyReportMapper.mapForDailyReportHousting(dailyReport);
    }
    async getDailyReportWithMoneySales(hotelId: number, cashId: number): Promise<DailyReportSales> {
        const dailyReport = await this.dailyReportRepository.getDailyReport(hotelId, cashId);
        return this.dailyReportMapper.mapForDailyReportSales(dailyReport);
    }

    updateMoneyTotalDueHousting(dailyReportHousting: DailyReportHousting): void {
        this.dailyReportRepository.updateMoneyTotalDueHousting(dailyReportHousting);
    }
    updateMoneyTotalDueSales(dailyReportSales: DailyReportSales): void {
        this.dailyReportRepository.updateMoneyTotalDueSales(dailyReportSales);
    }
}
