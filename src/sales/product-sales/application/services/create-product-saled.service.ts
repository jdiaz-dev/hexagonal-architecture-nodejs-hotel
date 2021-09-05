import { Service } from "typedi";

import { CreateProductSaledRequest } from "../ports/in/create-product-saled.request";
import { DataProductSaled } from "./product-saled-data";
import { CreateProductSalePort } from "../ports/out/self-domain/create-product-saled";
import { ProductSalePersistenceAdapter } from "../../adapters/out/persistence/product-sale-persistence.adapter";
import { GetProductService } from "../../../products/application/services/get-product.service";
import { GetProductModeledForProductSaleDomain } from "../ports/out/other-domain/get-product-modeled-for-product-sale-domain";
import { ProductSaleDomainEntity } from "../../domain/products-saled";

@Service()
export class CreateProductSaledService implements CreateProductSaledRequest {
  //other domain
  private getProductModeledForProductSaleDomain: GetProductModeledForProductSaleDomain;

  //self ports
  private createProductSalePort: CreateProductSalePort;

  constructor(
    //other domain
    getProductService: GetProductService,

    //self ports
    productSalePersistenceAdapter: ProductSalePersistenceAdapter
  ) {
    //other domain
    this.getProductModeledForProductSaleDomain = getProductService;

    //self ports
    this.createProductSalePort = productSalePersistenceAdapter;
  }
  async createTheProductSale(
    cashId: number,
    houstingId: number,
    productId: number,
    productSaleData: DataProductSaled
  ): Promise<any> {
    const product: ProductSaleDomainEntity =
      await this.getProductModeledForProductSaleDomain.getProductModeledForProductSaleDomain(
        productId
      );

    //bussines logic
    const totalPrice: number = product.calculateTotalPrice(
      productSaleData.amount
    );
    productSaleData.totalPrice = totalPrice;

    const productSaledCreated =
      await this.createProductSalePort.createProductSaled(
        cashId,
        houstingId,
        productId,
        productSaleData
      );
    return productSaledCreated;
  }
}
