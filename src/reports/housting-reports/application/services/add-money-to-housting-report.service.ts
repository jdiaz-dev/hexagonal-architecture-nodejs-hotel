import { Service } from 'typedi';
import { HoustingReportPersistenceAdapter } from '../../adapters/out/persistence/housting-report-persistence-adapter';
import { AddMoneyToHoustingReportDueProductsUseCase } from '../ports/in/add-money-to-housting-report-due-products-use-case';
import { GetHoustingReportModeledForSelfDomainPort } from './../ports/in/get-housting-report-modeled-for-self-domain.port';
import { HoustingReportDomain } from './../../domain/housting-report';
import { UpdateMoneyInHoustingReportPort } from './../ports/out/self-domain/update-money-in-housting-report.port';
import { AddMoneyToHoustingReportDueHoustingUseCase } from './../ports/in/add-money-to-housting-report-due-housting-use-case';

@Service()
export class AddMoneyToHoustingReportService
    implements AddMoneyToHoustingReportDueHoustingUseCase, AddMoneyToHoustingReportDueProductsUseCase
{
    private getHoustingReportModeledPort: GetHoustingReportModeledForSelfDomainPort;
    private updateMoneyInHoustingReportPort: UpdateMoneyInHoustingReportPort;

    constructor(houstingReportPersistenceAdapter: HoustingReportPersistenceAdapter) {
        this.getHoustingReportModeledPort = houstingReportPersistenceAdapter;
        this.updateMoneyInHoustingReportPort = houstingReportPersistenceAdapter;
    }
    async addMoneyToHoustingReportDueHousting(houstingId: number, moneyToAdd: number) {
        const houstingReport: HoustingReportDomain =
            await this.getHoustingReportModeledPort.getHoustingReportModeledForSelfDomain(houstingId);

        houstingReport.addMoney(moneyToAdd);

        this.updateMoneyInHoustingReportPort.updateMoneyInHoustingReport(houstingReport);
    }
    async addMoneyToHoustingReportDueProducts(
        houstingId: number,
        producsSaledReportId: number,
        productsSaled: Array<any>,
    ) {
        const houstingReport: HoustingReportDomain =
            await this.getHoustingReportModeledPort.getHoustingReportModeledForSelfDomain(houstingId);

        for (let x = 0; x < productsSaled.length; x++) {
            houstingReport.addMoney(productsSaled[x].totalPrice);
        }
        this.updateMoneyInHoustingReportPort.updateMoneyInHoustingReport(houstingReport, producsSaledReportId);
    }
}
