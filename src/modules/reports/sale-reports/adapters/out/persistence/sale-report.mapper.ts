import { Service } from 'typedi';
import { SaleReportModel } from './sale-report.model';
import { SaleReportDomain } from '../../../domain/sale-report';

@Service()
export class SaleReportMapper {
    mapForSelfDomain(saleReport: SaleReportModel): SaleReportDomain {
        if (saleReport == null) return new SaleReportDomain(0, 0);
        return new SaleReportDomain(saleReport.id, saleReport.total);
    }
}
