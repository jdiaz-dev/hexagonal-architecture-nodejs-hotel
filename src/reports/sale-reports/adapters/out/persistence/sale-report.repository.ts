export interface SaleReportRepository {
  createSaleReport(moneyTotal: number, houstingId: number): Promise<any>;
  getSaleReport(houstingId: number): Promise<any>;
}
