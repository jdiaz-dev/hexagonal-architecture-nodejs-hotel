import { Service } from 'typedi';
import { CreateHoustingReportPort } from '../../../application/ports/out/self-domain/create-housting-report.port';
import { GetHoustingReportPort } from '../../../application/ports/out/self-domain/get-housting-report.port';
import { HoustingReportORM } from './housting-report.orm';
import { UpdateMoneyInHoustingReportPort } from './../../../application/ports/out/self-domain/update-money-in-housting-report.port';
import { HoustingReportDomain } from '../../../domain/housting-report';
import { HoutingReportMapper } from './housting-report.mapper';
import { GetHoustingReportModeledForSelfDomainPort } from './../../../application/ports/in/get-housting-report-modeled-for-self-domain.port';

@Service()
export class HoustingReportPersistenceAdapter
    implements
        CreateHoustingReportPort,
        GetHoustingReportPort,
        UpdateMoneyInHoustingReportPort,
        GetHoustingReportModeledForSelfDomainPort
{
    constructor(private houstingReportORM: HoustingReportORM, private houtingReportMapper: HoutingReportMapper) {}
    async createHoustingReport(cashId: number, houstingId: number, moneyToAdd: number): Promise<any> {
        const houstigReport = await this.houstingReportORM.createHoustingReport(cashId, houstingId, moneyToAdd);
        return houstigReport;
    }

    async getHoustingReport(houstingId: number): Promise<any> {
        const houstingReport = this.houstingReportORM.getHoustingReport(houstingId);
        return houstingReport;
    }
    async getHoustingReportModeledForSelfDomain(houstingId: number): Promise<HoustingReportDomain> {
        const houstingReport = await this.houstingReportORM.getHoustingReport(houstingId);
        return this.houtingReportMapper.mapForSelfDomain(houstingReport);
    }
    async updateMoneyInHoustingReport(_houstingReport: HoustingReportDomain) {
        const houstingReport = await this.houstingReportORM.updateMoneyInHoustingReport(_houstingReport);
        return houstingReport;
    }
}
