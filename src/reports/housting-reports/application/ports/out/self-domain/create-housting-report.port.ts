export interface CreateHoustingReportPort {
  createHoustingReport(cashId: number, houstingId: number, saleReportId: number, moneyTotal: number): Promise<any>;
}
