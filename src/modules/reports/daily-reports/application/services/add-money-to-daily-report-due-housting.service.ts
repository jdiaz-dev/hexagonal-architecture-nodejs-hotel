import { Service } from 'typedi';
import { DailyReportPersistenceAdapter } from '../../adapters/out/daily-report-persistence.adapter';
import { DailyReportHousting } from '../../domain/daily-report-housting';
import { IAddMoneyToDailyReportDueHoustingUseCase } from '../ports/in/add-money-to-daily-report-due-housting-use-case';
import { IGetDailyReportWithMoneyHoustingPort } from '../ports/out/self-domain/get-daily-report-with-money-housting.port';
import { IUpdateMoneyTotalDueHoustingPort } from '../ports/out/self-domain/update-money-total-due-housting.port';

@Service()
export class AddMoneyToDailyReportDueHoustingService implements IAddMoneyToDailyReportDueHoustingUseCase {
    private getDailyReportWithMoneyHousting: IGetDailyReportWithMoneyHoustingPort;
    private updateMoneyTotalDueHousting: IUpdateMoneyTotalDueHoustingPort;

    constructor(dailyReportPersistenceAdapter: DailyReportPersistenceAdapter) {
        this.getDailyReportWithMoneyHousting = dailyReportPersistenceAdapter;
        this.updateMoneyTotalDueHousting = dailyReportPersistenceAdapter;
    }
    async addMoneyDueHousting(hotelId: number, cashId: number, moneyToAdd: number) {
        const dailyReport: DailyReportHousting =
            await this.getDailyReportWithMoneyHousting.getDailyReportWithMoneyHousting(hotelId, cashId);

        dailyReport.addMoneyToHousting(moneyToAdd);
        this.updateMoneyTotalDueHousting.updateMoneyTotalDueHousting(dailyReport);
    }
}
