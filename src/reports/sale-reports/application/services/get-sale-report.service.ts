import { Service } from 'typedi';
import { GetSaleReportPort } from '../ports/out/self-domain/get-sale-report.port';
import { SaleReportPersistenceAdapter } from '../../adapters/out/persistence/sale-report-persistence.adapter';
import { GetSaleReportForHoustingReportDomain } from '../../../housting-reports/application/ports/out/other-domains/get-sale-report-for-housting-report-domain';
import { MoneyPaidSaleReportDomainEntity } from '../../../housting-reports/domain/money-paid-sale-report';
import { CreateSaleReportService } from './create-sale-report.service';

@Service()
export class GetSaleReportService implements GetSaleReportForHoustingReportDomain {
  //self ports
  private getSaleReportPort: GetSaleReportPort;

  constructor(
    //other services and ports
    private createSaleReportService: CreateSaleReportService,

    //self ports
    saleReportPersistenceAdapter: SaleReportPersistenceAdapter,
  ) {
    //self ports
    this.getSaleReportPort = saleReportPersistenceAdapter;
  }
  async getSaleReportForHoustingReportDomain(
    houstingId: number,
  ): Promise<MoneyPaidSaleReportDomainEntity | boolean> {
    let saleReport = await this.getSaleReportPort.getSaleReport(houstingId);

    if (!saleReport) {
      saleReport = await this.createSaleReportService.createTheSaleReport(houstingId);

      if (!saleReport) return false;
    }

    return new MoneyPaidSaleReportDomainEntity(saleReport.id, saleReport.houstingId, saleReport.total);
  }
}
