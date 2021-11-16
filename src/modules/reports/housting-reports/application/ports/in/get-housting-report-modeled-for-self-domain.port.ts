import { HoustingReportDomain } from '../../../domain/housting-report';

export interface GetHoustingReportModeledForSelfDomainPort {
    getHoustingReportModeledForSelfDomain(houstingId: number): Promise<HoustingReportDomain>;
}
