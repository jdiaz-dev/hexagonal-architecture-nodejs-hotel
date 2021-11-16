import { Service } from 'typedi';

import { GetProductPort } from '../ports/out/self-domain/get-product.port';
import { ProductPersistenceAdapter } from '../../adapters/out/persistence/product-persistence.adapter';

@Service()
export class GetProductService {
  private getProductPort: GetProductPort;

  constructor(productPersistenceAdapter: ProductPersistenceAdapter) {
    this.getProductPort = productPersistenceAdapter;
  }
}
