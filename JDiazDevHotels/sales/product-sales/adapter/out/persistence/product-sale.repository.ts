import { DataProductSaled } from "../../../application/services/product-saled-data";

export interface ProductSaleRepository {
    createProductSaled(cashId:number, houstingId:number, productId:number, productSaleData:DataProductSaled):Promise<any>
    updateAmountToProductSaled(productsSaledId:number, amountProducts:number, totalPrice:number):Promise<any>  
    getProductSaled(productSaledId:number):Promise<any>
    updateProductSaledPayed(productSaledId:number):Promise<any>
    getProductsSaled(houstingId:number):Promise<any>
}