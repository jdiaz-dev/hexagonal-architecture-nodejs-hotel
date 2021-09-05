import { DataProduct } from "../../services/data-product";

export interface CreateProductRequest {
    createTheProduct(hotelId:number, dataProduct: DataProduct): Promise<any>
}