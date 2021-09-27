import { Service } from 'typedi';
import { ProductModel } from './product.model';
import { ProductSaledDomain } from '../../../../product-saled/domain/products-saled';

@Service()
export class ProductMapper {
    mapToProductSaleDomain(product: ProductModel): ProductSaledDomain {
        return new ProductSaledDomain(product.price);
    }
}
