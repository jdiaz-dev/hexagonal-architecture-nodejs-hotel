import { ProductSaledDomain } from '../../../domain/product-saled';
import { IProductSaledDTO } from './../../../application/ports/in/create-products.saled.command';

export interface ProductSaleRepository {
    createProductSaled(_productSaled: ProductSaledDomain, productSaledDTO: IProductSaledDTO): Promise<any>;
    updateAmountToProductSaled(productsSaledId: number, amountProducts: number, totalPrice: number): Promise<any>;
    getProductSaled(productSaledId: number): Promise<any>;
    updateProductSaledPayed(productSaledId: number): Promise<any>;
    getProductsSaled(houstingId: number): Promise<any>;
}
