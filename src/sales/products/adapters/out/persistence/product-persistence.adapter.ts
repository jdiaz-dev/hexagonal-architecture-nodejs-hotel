import { Service } from "typedi";
import { DataProduct } from "../../../application/services/data-product";
import { CreateProductPort } from "../../../application/ports/out/self-domain/create-product.port";
import { ProductORM } from "./product.orm";
import { GetProductsPort } from "../../../application/ports/out/self-domain/get-products.port";
import { GetProductModeledPort } from "../../../application/ports/out/self-domain/get-product-modeled.port";
import { ProductDomianEntity } from "../../../domain/product";
import { UpdateProductPort } from "../../../application/ports/out/self-domain/update-product";
import { RemoveProductPort } from "../../../application/ports/out/self-domain/remove-product.port";
import { GetProductPort } from "../../../application/ports/out/self-domain/get-product.port";
import { IQueries } from "../../../../../shared/interfaces/query.interface";

@Service()
export class ProductPersistenceAdapter
  implements
    CreateProductPort,
    GetProductsPort,
    GetProductModeledPort,
    GetProductPort,
    UpdateProductPort,
    RemoveProductPort
{
  constructor(private productORM: ProductORM) {}

  async createProduct(hotelId: number, dataProduct: DataProduct): Promise<any> {
    const product = await this.productORM.saveProduct(hotelId, dataProduct);
    return product;
  }
  async getProducts(hotelId: number, queries: IQueries): Promise<any> {
    const products = await this.productORM.getProducts(hotelId, queries);
    return products;
  }
  async getProduct(productId: number): Promise<any> {
    const product = await this.productORM.getProduct(productId);
    return product;
  }
  async getProductModeled(productId: number): Promise<ProductDomianEntity> {
    const product = await this.productORM.getProduct(productId);
    return new ProductDomianEntity(product.hotelId);
  }
  async updateProduct(
    productId: number,
    dataProduct: DataProduct
  ): Promise<any> {
    const product = await this.productORM.updateProduct(productId, dataProduct);
    return product;
  }
  async removeProduct(productId: number): Promise<any> {
    const product = await this.productORM.removeProduct(productId);
    return product;
  }
}
