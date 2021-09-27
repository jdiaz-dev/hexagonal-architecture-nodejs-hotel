import { Service } from 'typedi';
import { HoustingReportPersistenceAdapter } from '../../adapters/out/persistence/housting-report-persistence-adapter';
import { AddMoneyToHoustingReportUseCase } from '../ports/in/add-money-to-housting-report-use-case';
import { GetHoustingReportModeledForSelfDomainPort } from './../ports/in/get-housting-report-modeled-for-self-domain.port';
import { HoustingReportDomain } from './../../domain/housting-report';
import { UpdateMoneyInHoustingReportPort } from './../ports/out/self-domain/update-money-in-housting-report.port';

@Service()
export class AddMoneyToHoustingReportService implements AddMoneyToHoustingReportUseCase {
    private getHoustingReportModeledPort: GetHoustingReportModeledForSelfDomainPort;
    private updateMoneyInHoustingReportPort: UpdateMoneyInHoustingReportPort;

    constructor(houstingReportPersistenceAdapter: HoustingReportPersistenceAdapter) {
        this.getHoustingReportModeledPort = houstingReportPersistenceAdapter;
        this.updateMoneyInHoustingReportPort = houstingReportPersistenceAdapter;
    }
    async addMoneyToHoustingReport(houstingId: number, moneyToAdd: number) {
        const houstingReport: HoustingReportDomain =
            await this.getHoustingReportModeledPort.getHoustingReportModeledForSelfDomain(houstingId);
        houstingReport.addMoney(moneyToAdd);
        this.updateMoneyInHoustingReportPort.updateMoneyInHoustingReport(houstingReport);
    }
}
