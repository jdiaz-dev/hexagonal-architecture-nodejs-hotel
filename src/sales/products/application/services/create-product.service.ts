import { Service } from "typedi";
import { ProductPersistenceAdapter } from "../../adapters/out/persistence/product-persistence.adapter";
import { CreateProductRequest } from "../ports/in/create-product.request";
import { GetHotelForProductDomain } from "../ports/out/other-domain/get-product-for-product-domain";
import { GetHotelService } from "../../../../managament/hotels/application/services/get-hotel.service";
import { CreateProductPort } from "../ports/out/self-domain/create-product.port";
import { DataProduct } from "./data-product";

@Service()
export class CreateProductService implements CreateProductRequest {
  private getHotelForProductDomain: GetHotelForProductDomain;
  private createProductPort: CreateProductPort;

  constructor(
    //other domains
    getHotelService: GetHotelService,

    //self ports
    productPersistenceAdapter: ProductPersistenceAdapter
  ) {
    //other domains
    this.getHotelForProductDomain = getHotelService;

    //other ports
    this.createProductPort = productPersistenceAdapter;
  }
  async createTheProduct(
    hotelId: number,
    dataProduct: DataProduct
  ): Promise<any> {
    const hotel = await this.getHotelForProductDomain.getHotelForProductDomain(
      hotelId
    );

    if (!hotel) {
      return { message: "You cannot create product" };
    }

    const productCreated = await this.createProductPort.createProduct(
      hotelId,
      dataProduct
    );
    return productCreated;
  }
}
