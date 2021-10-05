import { ProductSaledDomain } from '../../../../domain/product-saled';

export interface GetProductForProductSaleDomainPort {
    getProductForProductSaleDomain(productId: number, ammount: number): Promise<ProductSaledDomain>;
}
