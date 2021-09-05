import { IQueries } from "../../../../../../shared/interfaces/query.interface";

export interface GetProductsPort {
  getProducts(hotelId: number, queries: IQueries): Promise<any>;
}
