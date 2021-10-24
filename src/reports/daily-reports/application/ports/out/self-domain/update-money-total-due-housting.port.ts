import { DailyReportHousting } from '../../../../domain/daily-report-housting';

export interface IUpdateMoneyTotalDueHoustingPort {
    updateMoneyTotalDueHousting(dailyReportHousting: DailyReportHousting): void;
}
