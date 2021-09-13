import { Service } from 'typedi';
import { CreateHoustingReportPort } from '../../../application/ports/out/self-domain/create-housting-report.port';
import { GetHoustingReportPort } from '../../../application/ports/out/self-domain/get-housting-report.port';
import { HoustingReportORM } from './housting-report.orm';

@Service()
export class HoustingReportPersistenceAdapter implements CreateHoustingReportPort, GetHoustingReportPort {
  constructor(private houstingReportORM: HoustingReportORM) {}
  async createHoustingReport(
    cashId: number,
    houstingId: number,
    saleReportId: number,
    moneyTotal: number,
  ): Promise<any> {
    const houstigReport = await this.houstingReportORM.createHoustingReport(
      cashId,
      houstingId,
      saleReportId,
      moneyTotal,
    );
    return houstigReport;
  }

  async getHoustingReport(houstingId: number): Promise<any> {
    const houstingReport = this.houstingReportORM.getHoustingReport(houstingId);
    return houstingReport;
  }
}
