import { ProductSaledDomain } from '../../../../domain/product-saled';
import { IProductSaledDTO } from '../../in/interfaces/product-saled-dto';

export interface CreateProductSalePort {
    createProductSaled(
        productSaled: Array<{ _productSaledDomain: ProductSaledDomain; productSaledDTO: IProductSaledDTO }>,
    ): Promise<any>;
}
