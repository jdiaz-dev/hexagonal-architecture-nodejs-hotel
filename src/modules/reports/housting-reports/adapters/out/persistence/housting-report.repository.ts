import { HoustingReportDomain } from '../../../domain/housting-report';

export interface HoustingReportRepository {
    createHoustingReport(cashId: number, houstingId: number, moneyToAdd: number): Promise<any>;
    getHoustingReport(houstingId: number): Promise<any>;
    getHoustingReports(cashId: number): Promise<any>;
    updateMoneyInHoustingReport(
        houstingReport: HoustingReportDomain,
        productsSaledReportId?: number,
    ): Promise<any>;
}
