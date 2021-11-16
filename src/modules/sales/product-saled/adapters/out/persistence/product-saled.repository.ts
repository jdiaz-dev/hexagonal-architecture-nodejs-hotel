import { ProductSaledDomain } from '../../../domain/product-saled';
import { ProductSaledModel } from './product-saled-model';

export interface ProductSaleRepository {
    createProductSaled(productsSaledMapped: Array<ProductSaledModel>): Promise<any>;
    updateAmountToProductSaled(productsSaledId: number, amountProducts: number, totalPrice: number): Promise<any>;
    getProductSaled(productSaledId: number): Promise<any>;
    getProductsSaled(houstingId: number): Promise<any>;
    getProductsSaledForReport(cashId: number): Promise<any>;
    updateProductSaledPayed(productSaledIds: number[]): Promise<any>;
}
