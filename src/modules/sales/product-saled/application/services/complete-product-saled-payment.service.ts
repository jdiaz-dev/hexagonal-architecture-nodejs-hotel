import { Service } from 'typedi';

import { CompletePaymentProductSaledUseCase } from '../ports/in/complete-payment-product-saled-use-case';
import { UpdateProductSaledPayedPort } from '../ports/out/self-domain/upate-product-saled-payed.port';
import { ProductSaledPersistenceAdapter } from '../../adapters/out/persistence/product-saled-persistence.adapter';

@Service()
export class CompletePaymentProductSaledService implements CompletePaymentProductSaledUseCase {
    private updateProductSaledPayedPort: UpdateProductSaledPayedPort;

    constructor(productSaledPersistenceAdapter: ProductSaledPersistenceAdapter) {
        this.updateProductSaledPayedPort = productSaledPersistenceAdapter;
    }
    async completePaymentProductSaled(productSaledId: number[]): Promise<any> {
        const productSaledPayed = await this.updateProductSaledPayedPort.updateProductSaledPayed(productSaledId);
        return productSaledPayed;
    }
}
