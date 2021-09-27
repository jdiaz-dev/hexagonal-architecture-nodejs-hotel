import { HoustingReportDomain } from '../../../domain/housting-report';

export interface HoustingReportRepository {
    createHoustingReport(cashId: number, houstingId: number, moneyToAdd: number): Promise<any>;
    getHoustingReport(houstingId: number): Promise<any>;
    updateMoneyInHoustingReport(houstingReport: HoustingReportDomain): Promise<any>;
}
