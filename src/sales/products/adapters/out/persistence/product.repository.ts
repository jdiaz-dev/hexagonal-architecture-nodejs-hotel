import { IQueries } from "../../../../../shared/interfaces/query.interface";
import { DataProduct } from "../../../application/services/data-product";

export interface ProductRepository {
  saveProduct(hotelId: number, dataProduct: DataProduct): Promise<any>;
  getProducts(hotelId: number, queries: IQueries): Promise<any>;
  getProduct(productId: number): Promise<any>;
  updateProduct(productId: number, dataProduct: DataProduct): Promise<any>;
  removeProduct(productId: number): Promise<any>;
}
