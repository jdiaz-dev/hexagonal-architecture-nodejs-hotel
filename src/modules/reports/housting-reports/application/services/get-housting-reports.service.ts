import { Service } from 'typedi';
import { HoustingReportPersistenceAdapter } from '../../adapters/out/persistence/housting-report-persistence-adapter';
import { IGetHoustingReportsUseCase } from '../ports/in/get-housting-reports-use-case';
import { IGetHoustingReportsPort } from '../ports/out/self-domain/get-housting-reports.port';

@Service()
export class GetHoustingReportsService implements IGetHoustingReportsUseCase {
    private getHoustingReportsPort: IGetHoustingReportsPort;

    constructor(houstingReportPersistenceAdapter: HoustingReportPersistenceAdapter) {
        this.getHoustingReportsPort = houstingReportPersistenceAdapter;
    }
    async getTheHoustingReports(cashId: number): Promise<any> {
        const houstingReports = await this.getHoustingReportsPort.getHoustingReports(cashId);
        return houstingReports;
    }
}
