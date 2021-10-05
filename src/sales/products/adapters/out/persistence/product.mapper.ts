import { Service } from 'typedi';
import { ProductModel } from './product.model';
import { ProductSaledDomain } from '../../../../product-saled/domain/product-saled';

@Service()
export class ProductMapper {
    mapToProductSaleDomain(product: ProductModel, ammount: number): ProductSaledDomain {
        return new ProductSaledDomain(new ProductSaledDomain.ProductId(product.id), product.price, ammount);
    }
}
