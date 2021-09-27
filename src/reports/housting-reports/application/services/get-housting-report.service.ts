import { Service } from 'typedi';

import { HoustingReportPersistenceAdapter } from '../../adapters/out/persistence/housting-report-persistence-adapter';
import { GetHoustingReportPort } from '../ports/out/self-domain/get-housting-report.port';
import { CreateHoustingReportService } from './create-housting-report.service';
import { GetHoustingReportUseCase } from '../ports/in/get-housting-report-use-case';

@Service()
export class GetHoustingReportService implements GetHoustingReportUseCase {
    private getHoustingReportPort: GetHoustingReportPort;

    constructor(
        private createHoustingReportService: CreateHoustingReportService,
        houstingReportPersistenceAdapter: HoustingReportPersistenceAdapter,
    ) {
        this.getHoustingReportPort = houstingReportPersistenceAdapter;
    }
    async getTheHoustingReport(cashId: number, houstingId: number): Promise<any> {
        /* let houstingReport = await this.getHoustingReportPort.getHoustingReport(houstingId);

    if (!houstingReport) {
      houstingReport = await this.createHoustingReportService.createHoustingReport(cashId, houstingId);
    }
    return houstingReport; */
    }
}
