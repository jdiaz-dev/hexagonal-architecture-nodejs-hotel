import { ProductSaledDomain } from '../../../../domain/product-saled';
import { IProductSaledDTO } from './../../in/create-products.saled.command';

export interface CreateProductSalePort {
    createProductSaled(productSaled: ProductSaledDomain, productSaledDTO: IProductSaledDTO): Promise<any>;
}
