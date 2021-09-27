import { ProductSaledDomain } from '../../../../domain/products-saled';

export interface GetProductForProductSaleDomainPort {
    getProductForProductSaleDomain(productId: number): Promise<ProductSaledDomain>;
}
