import { HoustingReportDomain } from '../../../domain/housting-report';

export interface GetHoustingReportUseCase {
    getTheHoustingReport(cashId: number, houstingId: number): Promise<any>;
}
