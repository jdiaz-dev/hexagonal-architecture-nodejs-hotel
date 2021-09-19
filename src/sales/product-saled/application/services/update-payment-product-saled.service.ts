import { Service } from 'typedi';

import { FinishPaymentProductSaledUseCase } from '../ports/in/finish-payment-product-saled-use-case';
import { UpdateProductSaledPayedPort } from '../ports/out/self-domain/upate-product-saled-payed.port';
import { ProductSaledPersistenceAdapter } from '../../adapters/out/persistence/product-saled-persistence.adapter';

@Service()
export class CompleteProductSaledPaymentService implements FinishPaymentProductSaledUseCase {
    private updateProductSaledPayedPort: UpdateProductSaledPayedPort;

    constructor(productSaledPersistenceAdapter: ProductSaledPersistenceAdapter) {
        this.updateProductSaledPayedPort = productSaledPersistenceAdapter;
    }
    async finishPaymentProductSaled(productSaledId: number): Promise<any> {
        const productSaledPayed = await this.updateProductSaledPayedPort.updateProductSaledPayed(productSaledId);
        return productSaledPayed;
    }
}
