import { Service } from "typedi";

import { GetProductPort } from './../ports/out/self-domain/get-product.port';
import { ProductPersistenceAdapter } from './../../adapter/out/persistence/product-persistence.adapter';
import { GetProductModeledForProductSaleDomain } from "../../../product-sales/application/ports/out/other-domain/get-product-modeled-for-product-sale-domain";
import { ProductSaleDomainEntity } from "../../../product-sales/domain/products-saled";

@Service()
export class GetProductService implements GetProductModeledForProductSaleDomain{
    private getProductPort:GetProductPort

    constructor(productPersistenceAdapter:ProductPersistenceAdapter){
        this.getProductPort = productPersistenceAdapter
    }
    async getProductModeledForProductSaleDomain(productId:number):Promise<ProductSaleDomainEntity>{
        const product = await this.getProductPort.getProduct(productId)
        return new ProductSaleDomainEntity(product.price)
    }
}