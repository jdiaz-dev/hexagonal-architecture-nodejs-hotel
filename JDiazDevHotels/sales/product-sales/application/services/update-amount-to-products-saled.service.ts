import { Service } from "typedi";
import { UpdateAmountToProductSaledUseCase } from '../ports/in/update-amount-to-product-saled.request';
import { GetProductModeledForProductSaleDomain } from '../ports/out/other-domain/get-product-modeled-for-product-sale-domain';

import { GetProductSaledPort } from '../ports/out/self-domain/get-product-sale.port';
import { ProductSalePersistenceAdapter } from '../../infraestructure/out/persistence/product-sale-persistence.adapter';
import { ProductSaleDomainEntity } from '../../domain/products-saled';
import { UpdateAmountToProductSaledPort } from '../ports/out/self-domain/update-amount-to-product-saled.port';
import { GetProductService } from "../../../products/application/services/get-product.service";

@Service()
export class UpdateAmountToProductsSaledService implements UpdateAmountToProductSaledUseCase {

    //other domains
    private getProductModeledForProductSaleDomain: GetProductModeledForProductSaleDomain


    //self port
    private getProductSaledPort: GetProductSaledPort
    private updateAmountToProductSaledPort: UpdateAmountToProductSaledPort

    constructor(
        //other domains
        getProductService: GetProductService,
        productSalePersistenceAdapter: ProductSalePersistenceAdapter

    ) {
        //other domains
        this.getProductModeledForProductSaleDomain = getProductService

        //self ports
        this.getProductSaledPort = productSalePersistenceAdapter
        this.updateAmountToProductSaledPort = productSalePersistenceAdapter
    }
    async updateTheAmountToProductSaled(productsSaledId: number, ammountProducts: number): Promise<any> {

        const productsSaled = await this.getProductSaledPort.getProductSaled(productsSaledId)

        const product: ProductSaleDomainEntity = await this.getProductModeledForProductSaleDomain.getProductModeledForProductSaleDomain(productsSaled.productId)

        //bussines logic
        const totalPrice = product.calculateTotalPrice(ammountProducts)

        const newAmountProductsSaled = await this.updateAmountToProductSaledPort.updateAmountToProductSaled(productsSaledId, ammountProducts, totalPrice)

        return newAmountProductsSaled
    }
}

