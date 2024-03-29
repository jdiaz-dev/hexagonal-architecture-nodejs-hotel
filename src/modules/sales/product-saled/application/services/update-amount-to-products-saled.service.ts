import { Service } from 'typedi';
import { UpdateAmountToProductSaledUseCase } from '../ports/in/update-amount-to-product-saled.request';
import { GetProductForProductSaleDomainPort } from '../ports/out/other-domain/get-product-modeled-for-product-sale-domain';

import { GetProductSaledPort } from '../ports/out/self-domain/get-product-sale.port';
import { ProductSaledPersistenceAdapter } from '../../adapters/out/persistence/product-saled-persistence.adapter';
import { ProductSaledDomain } from '../../domain/product-saled';
import { UpdateAmountToProductSaledPort } from '../ports/out/self-domain/update-amount-to-product-saled.port';
import { ProductPersistenceAdapter } from '../../../products/adapters/out/persistence/product-persistence.adapter';

//thinking in remove
@Service()
export class UpdateAmountToProductsSaledService implements UpdateAmountToProductSaledUseCase {
    //other domains
    private getProductForProductSaleDomainPort: GetProductForProductSaleDomainPort;

    //self port
    private getProductSaledPort: GetProductSaledPort;
    private updateAmountToProductSaledPort: UpdateAmountToProductSaledPort;

    constructor(
        //other domains
        productPersistenceAdapter: ProductPersistenceAdapter,
        productSaledPersistenceAdapter: ProductSaledPersistenceAdapter,
    ) {
        //other domains
        this.getProductForProductSaleDomainPort = productPersistenceAdapter;

        //self ports
        this.getProductSaledPort = productSaledPersistenceAdapter;
        this.updateAmountToProductSaledPort = productSaledPersistenceAdapter;
    }
    async updateTheAmountToProductSaled(productsSaledId: number, ammountProducts: number): Promise<any> {
        /* const productsSaled = await this.getProductSaledPort.getProductSaled(productsSaledId);

        const product: ProductSaledDomain =
            await this.getProductForProductSaleDomainPort.getProductForProductSaleDomain(productsSaled.productId);

        //bussines logic
        const totalPrice = product.calculateTotalPrice(ammountProducts);

        const newAmountProductsSaled = await this.updateAmountToProductSaledPort.updateAmountToProductSaled(
            productsSaledId,
            ammountProducts,
            totalPrice,
        );

        return newAmountProductsSaled; */
        return '';
    }
}
