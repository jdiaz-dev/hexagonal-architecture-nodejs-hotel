import { Service } from 'typedi';

import { CreateProductsSaledUseCase } from '../ports/in/create-products-saled-use-case';
import { CreateProductSalePort } from '../ports/out/self-domain/create-product-saled';
import { ProductSaledPersistenceAdapter } from '../../adapters/out/persistence/product-saled-persistence.adapter';
import { GetProductService } from '../../../products/application/services/get-product.service';
import { GetProductForProductSaleDomainPort } from '../ports/out/other-domain/get-product-modeled-for-product-sale-domain';
import { ProductSaledDomain } from '../../domain/product-saled';
import { ProductPersistenceAdapter } from '../../../products/adapters/out/persistence/product-persistence.adapter';
import { CreateProductSaledCommand } from '../ports/in/create-products.saled.command';
import { IProductSaledPayload } from './../ports/in/interfaces/product-saled-payload';
import { IProductSaledDTO } from '../ports/in/interfaces/product-saled-dto';

@Service()
export class CreateProductSaledService implements CreateProductsSaledUseCase {
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
    async createTheProductsSaled(command: CreateProductSaledCommand): Promise<any> {
        const payload: IProductSaledPayload[] = command.getPayload;

        const productsSaledProcessed: Array<{
            _productSaledDomain: ProductSaledDomain;
            productSaledDTO: IProductSaledDTO;
        }> = [];

        for (let x = 0; x < payload.length; x++) {
            const product: ProductSaledDomain =
                await this.getProductForProductSaleDomainPort.getProductForProductSaleDomain(
                    payload[x].productId.value,
                    payload[x].amount,
                );
            product.calculateTotalPrice();
            productsSaledProcessed.push({
                _productSaledDomain: product,
                productSaledDTO: payload[x].productSaledDTO,
            });
        }

        const productSaledCreated = await this.createProductSalePort.createProductSaled(productsSaledProcessed);

        return productSaledCreated;
    }
}
