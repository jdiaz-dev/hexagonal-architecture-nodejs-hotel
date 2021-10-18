import { HoustingReportDomain } from './../../../../domain/housting-report';

export interface UpdateMoneyInHoustingReportPort {
    updateMoneyInHoustingReport(
        _houstingReport: HoustingReportDomain,
        productsSaledReportId?: number,
    ): Promise<any>;
}
