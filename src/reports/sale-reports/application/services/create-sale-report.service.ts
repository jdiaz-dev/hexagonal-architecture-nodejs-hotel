import { Service, Container } from "typedi";
import { CreateSaleReportUseCase } from "../ports/in/create-sale-report-use-case";
import { GetProductSalesToSaleReportDomain } from "../ports/out/other-domains/get-product-sales-to-sale-report-domain";
import { GetProductsSaledService } from "../../../../sales/product-sales/application/services/get-products-saled.service";
import { MoneySpentDomainEntity } from "../../domain/money-spent";
import { CreateSaleReportPort } from "../ports/out/self-domain/create-sale-report.port";
import { SaleReportPersistenceAdapter } from "../../adapters/out/persistence/sale-report-persistence.adapter";
import { GetSaleReportForHoustingReportDomain } from "../../../housting-reports/application/ports/out/other-domains/get-sale-report-for-housting-report-domain";

@Service()
export class CreateSaleReportService
  implements CreateSaleReportUseCase, GetSaleReportForHoustingReportDomain
{
  //other domains
  private getProductSalesToSaleReportDomain: GetProductSalesToSaleReportDomain;

  //self ports
  private createSaleReportPort: CreateSaleReportPort;

  constructor(
    //other domains
    getProductsSaledService: GetProductsSaledService,

    //self ports
    saleReportPersistenceAdapter: SaleReportPersistenceAdapter
  ) {
    this.getProductSalesToSaleReportDomain = getProductsSaledService;
    this.createSaleReportPort = saleReportPersistenceAdapter;
  }

  //method of use case
  async createTheSaleReport(houstingId: number): Promise<any> {
    const moneySetProducts: MoneySpentDomainEntity | any =
      await this.getProductSalesToSaleReportDomain.getProductSalesToSaleReportDomain(
        houstingId
      );

    if (!moneySetProducts) return false;

    const moneyTotalByHoustingInProducts =
      moneySetProducts.calculateTotalMoneySpentInProducts();

    const saleReportCreated = await this.createSaleReportPort.createSaleReport(
      moneyTotalByHoustingInProducts
    );
    return saleReportCreated;
  }
  async getSaleReportForHoustingReportDomain(houstingId: number): Promise<any> {
    const saleReport = await this.createTheSaleReport(houstingId);
    return saleReport;
  }
}

/*
const execute = Container.get(CreateSaleReportService)
execute.createTheSaleReport(1)

 */
