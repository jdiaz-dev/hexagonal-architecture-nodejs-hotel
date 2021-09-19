import { DataProductSaled } from "../../../services/product-saled-data";

export interface CreateProductSalePort {
    createProductSaled(cashId:number, houstingId:number, productId:number, productSaleData:DataProductSaled):Promise<any>
}