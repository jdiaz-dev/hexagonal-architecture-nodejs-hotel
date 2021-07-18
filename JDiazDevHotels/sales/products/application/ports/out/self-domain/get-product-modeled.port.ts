import { ProductDomianEntity } from "../../../../domain/product";

export interface GetProductModeledPort {
    getProductModeled(productId:number):Promise<ProductDomianEntity>
}