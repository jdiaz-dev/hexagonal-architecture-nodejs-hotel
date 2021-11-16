import { SaleReportDomain } from '../../../../domain/sale-report';

export interface GetSaleReportModeledForSelfDomainPort {
    getSaleReportModeledForSelfDomain(houstingId: number): Promise<SaleReportDomain>;
}
