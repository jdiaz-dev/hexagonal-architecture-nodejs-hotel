import { ProductSaleDomainEntity } from '../../../../domain/products-saled';

export interface GetProductForProductSaleDomainPort {
    getProductForProductSaleDomain(productId: number): Promise<ProductSaleDomainEntity>;
}
