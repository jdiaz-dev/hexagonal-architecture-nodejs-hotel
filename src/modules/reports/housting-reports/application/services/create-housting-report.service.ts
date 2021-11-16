import { Service } from 'typedi';
import { CreateHoustingReportPort } from '../ports/out/self-domain/create-housting-report.port';
import { HoustingReportPersistenceAdapter } from '../../adapters/out/persistence/housting-report-persistence-adapter';
import { CreateHoustingReportRequest } from '../ports/in/create-housting-report.request';

@Service()
export class CreateHoustingReportService implements CreateHoustingReportRequest {
    private createHoustingReportPort: CreateHoustingReportPort;

    constructor(houstingReportPersistenceAdapter: HoustingReportPersistenceAdapter) {
        this.createHoustingReportPort = houstingReportPersistenceAdapter;
    }
    async createHoustingReport(cashId: number, houstingId: number, moneyToAdd: number): Promise<any> {
        this.createHoustingReportPort.createHoustingReport(cashId, houstingId, moneyToAdd);
    }
}
