import { Service } from "typedi";
import { GetSaleReportPort } from "../ports/out/self-domain/get-sale-report.port";
import { SaleReportPersistenceAdapter } from "../../adapters/out/persistence/sale-report-persistence.adapter";
import { GetSaleReportForHoustingReportDomain } from "../../../housting-reports/application/ports/out/other-domains/get-sale-report-for-housting-report-domain";
import { MoneyPaidSaleReportDomainEntity } from "../../../housting-reports/domain/money-paid-sale-report";
import { CreateSaleReportService } from "./create-sale-report.service";
import { CreateSaleReportUseCase } from "../ports/in/create-sale-report-use-case";

@Service()
export class GetSaleReportService
  implements GetSaleReportForHoustingReportDomain
{
  //other services and ports
  private createSaleReportUseCase: CreateSaleReportUseCase;

  //self ports
  private getSaleReportPort: GetSaleReportPort;

  constructor(
    //other services and ports
    createSaleReportService: CreateSaleReportService,

    //self ports
    saleReportPersistenceAdapter: SaleReportPersistenceAdapter
  ) {
    //other services and ports
    this.createSaleReportUseCase = createSaleReportService;

    //self ports
    this.getSaleReportPort = saleReportPersistenceAdapter;
  }
  async getSaleReportForHoustingReportDomain(
    houstingId: number
  ): Promise<MoneyPaidSaleReportDomainEntity | boolean> {
    let saleReport = await this.getSaleReportPort.getSaleReport(houstingId);

    if (!saleReport) {
      saleReport = await this.createSaleReportUseCase.createTheSaleReport(
        houstingId
      );

      if (!saleReport) return false;
    }

    return new MoneyPaidSaleReportDomainEntity(
      saleReport.id,
      saleReport.houstingId,
      saleReport.total
    );
  }
}
