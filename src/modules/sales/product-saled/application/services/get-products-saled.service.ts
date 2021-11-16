import { Service } from 'typedi';
import { GetProductsSaledPort } from '../ports/out/self-domain/get-products-saled.port';
import { ProductSaledPersistenceAdapter } from '../../adapters/out/persistence/product-saled-persistence.adapter';
import { GetProductsSaledRequest } from '../ports/in/get-products-saled.request';

@Service()
export class GetProductsSaledService implements GetProductsSaledRequest {
    private getProductsSaledPort: GetProductsSaledPort;

    constructor(productSaledPersistenceAdapter: ProductSaledPersistenceAdapter) {
        this.getProductsSaledPort = productSaledPersistenceAdapter;
    }
    async getTheProductsSaled(houstingId: number) {
        return await this.getProductsSaledPort.getProductsSaled(houstingId);
    }
}
