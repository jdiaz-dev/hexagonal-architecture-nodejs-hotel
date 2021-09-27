import { SaleReportDomain } from './../../../../domain/sale-report';

export interface CreateSaleReportPort {
    createSaleReport(moneyTotal: number, houstingId: number): Promise<SaleReportDomain>;
}
