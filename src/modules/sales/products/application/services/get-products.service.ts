import { Service } from "typedi";
import { IQueries } from "../../../../../shared/interfaces/query.interface";
import { ProductPersistenceAdapter } from "../../adapters/out/persistence/product-persistence.adapter";
import { GetProductsRequest } from "../ports/in/get-products.reques";
import { GetProductsPort } from "../ports/out/self-domain/get-products.port";

@Service()
export class GetProductsService implements GetProductsRequest {
  private getProductsPort: GetProductsPort;

  constructor(productPersistenceAdapter: ProductPersistenceAdapter) {
    this.getProductsPort = productPersistenceAdapter;
  }
  async getTheProducts(hotelId: number, queries: IQueries): Promise<any> {
    const products = await this.getProductsPort.getProducts(hotelId, queries);
    return products;
  }
}
