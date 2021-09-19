import { Service } from 'typedi';

import { CreateProductSaledRequest } from '../ports/in/create-product-saled.request';
import { DataProductSaled } from './product-saled-data';
import { CreateProductSalePort } from '../ports/out/self-domain/create-product-saled';
import { ProductSaledPersistenceAdapter } from '../../adapters/out/persistence/product-saled-persistence.adapter';
import { GetProductService } from '../../../products/application/services/get-product.service';
import { GetProductForProductSaleDomainPort } from '../ports/out/other-domain/get-product-modeled-for-product-sale-domain';
import { ProductSaleDomainEntity } from '../../domain/products-saled';
import { ProductPersistenceAdapter } from '../../../products/adapters/out/persistence/product-persistence.adapter';

@Service()
export class CreateProductSaledService implements CreateProductSaledRequest {
    //other domain
    private getProductForProductSaleDomainPort: GetProductForProductSaleDomainPort;

    //self ports
    private createProductSalePort: CreateProductSalePort;

    constructor(
        //other domain
        productPersistenceAdapter: ProductPersistenceAdapter,

        //self ports
        productSaledPersistenceAdapter: ProductSaledPersistenceAdapter,
    ) {
        //other domain
        this.getProductForProductSaleDomainPort = productPersistenceAdapter;

        //self ports
        this.createProductSalePort = productSaledPersistenceAdapter;
    }
    async createTheProductSale(
        cashId: number,
        houstingId: number,
        productId: number,
        productSaleData: DataProductSaled,
    ): Promise<any> {
        const product: ProductSaleDomainEntity =
            await this.getProductForProductSaleDomainPort.getProductForProductSaleDomain(productId);

        //bussines logic
        const totalPrice: number = product.calculateTotalPrice(productSaleData.amount);
        productSaleData.totalPrice = totalPrice;

        const productSaledCreated = await this.createProductSalePort.createProductSaled(
            cashId,
            houstingId,
            productId,
            productSaleData,
        );
        return productSaledCreated;
    }
}
