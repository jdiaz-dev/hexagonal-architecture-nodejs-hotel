import { SaleReportDomain } from '../../../../domain/sale-report';

export interface UpdateMoneyInSaleReportPort {
    updateMoneyInSaleReport(saleReport: SaleReportDomain): Promise<any>;
}
