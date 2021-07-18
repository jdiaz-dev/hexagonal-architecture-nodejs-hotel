import { DataProduct } from "../../services/data-product";
import { ProductCommand } from "./product.command";

export interface UpdateProductRequest {
    updateTheProduct(productId:number, dataProduct: DataProduct, command:ProductCommand): Promise<any>
}