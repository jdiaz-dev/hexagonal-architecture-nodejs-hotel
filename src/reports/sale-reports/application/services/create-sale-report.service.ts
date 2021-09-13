import { Service, Container } from 'typedi';
import { GetProductSalesToSaleReportDomain } from '../ports/out/other-domains/get-product-sales-to-sale-report-domain';
import { GetProductsSaledService } from '../../../../sales/product-sales/application/services/get-products-saled.service';
import { MoneySpentDomainEntity } from '../../domain/money-spent';
import { CreateSaleReportPort } from '../ports/out/self-domain/create-sale-report.port';
import { SaleReportPersistenceAdapter } from '../../adapters/out/persistence/sale-report-persistence.adapter';

@Service()
export class CreateSaleReportService {
  //other domains
  private getProductSalesToSaleReportDomain: GetProductSalesToSaleReportDomain;

  //self ports
  private createSaleReportPort: CreateSaleReportPort;

  constructor(
    //other domains
    getProductsSaledService: GetProductsSaledService,

    //self ports
    saleReportPersistenceAdapter: SaleReportPersistenceAdapter,
  ) {
    this.getProductSalesToSaleReportDomain = getProductsSaledService;
    this.createSaleReportPort = saleReportPersistenceAdapter;
  }

  //method of use case
  async createTheSaleReport(houstingId: number): Promise<any> {
    const moneySetProducts: MoneySpentDomainEntity | any =
      await this.getProductSalesToSaleReportDomain.getProductSalesToSaleReportDomain(houstingId);

    // if (!moneySetProducts) return false;

    const moneyTotalByHoustingInProducts = moneySetProducts.calculateTotalMoneySpentInProducts();

    const saleReportCreated = await this.createSaleReportPort.createSaleReport(
      moneyTotalByHoustingInProducts,
      houstingId,
    );
    return saleReportCreated;
  }
}

/*
const execute = Container.get(CreateSaleReportService)
execute.createTheSaleReport(1)

 */
