export interface CreateSaleReportPort {
  createSaleReport(moneyTotal: number, houstingId: number): Promise<any>;
}
