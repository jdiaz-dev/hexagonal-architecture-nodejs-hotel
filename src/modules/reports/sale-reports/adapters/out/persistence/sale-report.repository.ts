import { SaleReportDomain } from '../../../domain/sale-report';

export interface SaleReportRepository {
    createSaleReport(houstingId: number, moneyTotal: number): Promise<any>;
    getSaleReport(houstingId: number): Promise<any>;
    updateMoneyInSaleReport(saleReport: SaleReportDomain): Promise<any>;
}
