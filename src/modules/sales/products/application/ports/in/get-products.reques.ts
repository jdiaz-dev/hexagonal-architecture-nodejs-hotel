import { IQueries } from "../../../../../../shared/interfaces/query.interface";

export interface GetProductsRequest {
  getTheProducts(hotelId: number, queries: IQueries): Promise<any>;
}
