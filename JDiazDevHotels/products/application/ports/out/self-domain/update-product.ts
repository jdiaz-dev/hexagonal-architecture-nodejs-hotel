import { DataProduct } from "../../../services/data-product";

export interface UpdateProductPort {
    updateProduct(productId:number, dataProduct: DataProduct):Promise<any>
}