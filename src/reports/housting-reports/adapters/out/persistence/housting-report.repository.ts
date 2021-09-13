export interface HoustingReportRepository {
  createHoustingReport(cashId: number, houstingId: number, saleReportId: number, moneyTotal: number): Promise<any>;
  getHoustingReport(houstingId: number): Promise<any>;
}
