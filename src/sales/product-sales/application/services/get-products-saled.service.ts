import { Service } from 'typedi';
import { GetProductsSaledPort } from '../ports/out/self-domain/get-products-saled.port';
import { ProductSalePersistenceAdapter } from '../../adapters/out/persistence/product-sale-persistence.adapter';
import { GetProductSalesToSaleReportDomain } from '../../../../reports/sale-reports/application/ports/out/other-domains/get-product-sales-to-sale-report-domain';
import { MoneySpentDomainEntity } from '../../../../reports/sale-reports/domain/money-spent';

@Service()
export class GetProductsSaledService implements GetProductSalesToSaleReportDomain {
  private getProductsSaledPort: GetProductsSaledPort;

  constructor(productSalePersistenceAdapter: ProductSalePersistenceAdapter) {
    this.getProductsSaledPort = productSalePersistenceAdapter;
  }
  async getProductSalesToSaleReportDomain(houstingId: number): Promise<MoneySpentDomainEntity | boolean> {
    const productsSaled: any[] = await this.getProductsSaledPort.getProductsSaled(houstingId);

    if (!productsSaled) return false;

    const moneyOfSetProducts = new MoneySpentDomainEntity();
    for (let x = 0; x < productsSaled.length; x++) {
      moneyOfSetProducts.collectiontMoneySpent.push(productsSaled[x].totalPrice);
    }

    return moneyOfSetProducts;
  }
}
