import { ProductDomain } from '../../../../domain/product';

export interface GetProductModeledPort {
  getProductModeled(productId: number): Promise<ProductDomain>;
}
