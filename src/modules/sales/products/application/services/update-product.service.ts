import { Service } from 'typedi';

import { ProductPersistenceAdapter } from '../../adapters/out/persistence/product-persistence.adapter';
import { DataProduct } from './data-product';
import { UpdateProductRequest } from '../ports/in/update-product.request';
import { GetProductModeledPort } from '../ports/out/self-domain/get-product-modeled.port';
import { ProductDomain } from '../../domain/product';
import { ProductCommand } from '../ports/in/product.command';
import { UpdateProductPort } from '../ports/out/self-domain/update-product';

@Service()
export class UpdateProductService implements UpdateProductRequest {
  private getProductModeledPort: GetProductModeledPort;
  private updateProductPort: UpdateProductPort;

  constructor(productPersistenceAdapter: ProductPersistenceAdapter) {
    this.getProductModeledPort = productPersistenceAdapter;
    this.updateProductPort = productPersistenceAdapter;
  }

  async updateTheProduct(productId: number, dataProduct: DataProduct, command: ProductCommand): Promise<any> {
    const product: ProductDomain = await this.getProductModeledPort.getProductModeled(productId);

    if (!product.checkIfProductBelongsToHotel(command.getHotelId)) {
      return { message: 'You cannot update the product' };
    }

    const productUpdated = await this.updateProductPort.updateProduct(productId, dataProduct);
    return productUpdated;
  }
}
