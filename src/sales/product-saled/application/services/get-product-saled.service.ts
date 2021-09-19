import { Service } from 'typedi';

import { GetProductSaledForMiddleware } from '../../adapters/in/web/interfaces/get-products-saled-for-middleware';
import { ProductSaledPersistenceAdapter } from '../../adapters/out/persistence/product-saled-persistence.adapter';
import { GetProductSaledModeledPort } from '../ports/out/self-domain/get-product-saled-modeled.port';

@Service()
export class GetProductSaledService implements GetProductSaledForMiddleware {
    private getProductSaledModeledPort: GetProductSaledModeledPort;

    constructor(productSaledPersistenceAdapter: ProductSaledPersistenceAdapter) {
        this.getProductSaledModeledPort = productSaledPersistenceAdapter;
    }
    async getProductSaledForMiddleware(productsSaledId: number): Promise<any> {
        const producstSaled = await this.getProductSaledModeledPort.getProductSaledModeled(productsSaledId);
        return producstSaled;
    }
}
