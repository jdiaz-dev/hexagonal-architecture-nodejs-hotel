import { HoustingReportDomain } from '../../../../domain/housting-report';

export interface GetHoustingForHoustingReportDomain {
    getHoustingForHoustingReportDomain(houstingId: number): Promise<HoustingReportDomain>;
}
