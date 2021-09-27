import { Service } from 'typedi';
import { GetSaleReportPort } from '../ports/out/self-domain/get-sale-report.port';
import { SaleReportPersistenceAdapter } from '../../adapters/out/persistence/sale-report-persistence.adapter';

@Service()
export class GetSaleReportService {
    //self ports
    private getSaleReportPort: GetSaleReportPort;

    constructor(
        //other services and ports

        //self ports
        saleReportPersistenceAdapter: SaleReportPersistenceAdapter,
    ) {
        //self ports
        this.getSaleReportPort = saleReportPersistenceAdapter;
    }
    async getSaleReportForHoustingReportDomain(houstingId: number) {}
}
