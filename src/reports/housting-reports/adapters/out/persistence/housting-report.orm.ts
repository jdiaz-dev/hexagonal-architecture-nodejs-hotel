import { Service } from 'typedi';
import { HoustingReportDatabaseEntity } from './housting-report-database-entity';
import { HoustingReportRepository } from './housting-report.repository';

@Service()
export class HoustingReportORM implements HoustingReportRepository {
  async createHoustingReport(
    cashId: number,
    houstingId: number,
    saleReportId: number,
    moneyTotal: number,
  ): Promise<any> {
    try {
      const houstingReport = new HoustingReportDatabaseEntity();
      houstingReport.cashId = cashId;
      houstingReport.houstingId = houstingId;
      houstingReport.total = moneyTotal;
      houstingReport.saleReportId = saleReportId;
      await houstingReport.save();

      return houstingReport;
    } catch (error) {
      console.log('------------', error);
    }
  }
  async getHoustingReport(houstingId: number): Promise<any> {
    try {
      const houstingReport = HoustingReportDatabaseEntity.findOne({ where: { houstingId } });
      return houstingReport;
    } catch (error) {
      console.log('------------', error);
    }
  }
}
