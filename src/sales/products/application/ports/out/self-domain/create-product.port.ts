import { DataProduct } from "../../../services/data-product";

export interface CreateProductPort {
    createProduct(hotelId:number, dataProduct: DataProduct):Promise<any>
}