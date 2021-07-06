import { ProductSaleDomainEntity } from '../../../../domain/products-saled';

export interface GetProductModeledForProductSaleDomain {
    getProductModeledForProductSaleDomain(productId:number):Promise<ProductSaleDomainEntity>
}