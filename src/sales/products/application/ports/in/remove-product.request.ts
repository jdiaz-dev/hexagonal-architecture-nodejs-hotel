import { ProductCommand } from "./product.command";

export interface RemoveProductRequest {
    removeTheProduct(productId:number, command:ProductCommand):Promise<any>
}