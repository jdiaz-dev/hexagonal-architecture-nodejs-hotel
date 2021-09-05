import { DataProductSaled } from '../../services/product-saled-data';

export interface CreateProductSaledRequest {
    createTheProductSale(cashId:number, houstingId:number, productId:number, productSaleData:DataProductSaled):Promise<any>
} 