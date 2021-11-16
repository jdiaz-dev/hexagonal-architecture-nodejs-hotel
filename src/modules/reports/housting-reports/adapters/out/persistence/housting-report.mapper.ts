import { Service } from 'typedi';
import { HoustingReportDomain } from '../../../domain/housting-report';
import { HoustingReportModel } from './housting-report.model';

@Service()
export class HoutingReportMapper {
    mapForSelfDomain(houstinReport: HoustingReportModel): HoustingReportDomain {
        return new HoustingReportDomain(houstinReport.id, houstinReport.total);
    }
}
