import { Service } from "typedi";

import { FinishPaymentProductSaledUseCase } from "../ports/in/finish-payment-product-saled-use-case";
import { UpdateProductSaledPayedPort } from '../ports/out/self-domain/upate-product-saled-payed.port';
import { ProductSalePersistenceAdapter } from '../../adapter/out/persistence/product-sale-persistence.adapter';

@Service()
export class UpdatePaymentProductSaledService implements FinishPaymentProductSaledUseCase {
    private updateProductSaledPayedPort: UpdateProductSaledPayedPort

    constructor(productSalePersistenceAdapter: ProductSalePersistenceAdapter) {
        this.updateProductSaledPayedPort = productSalePersistenceAdapter
    }
    async finishPaymentProductSaled(productSaledId: number): Promise<any> {
        const productSaledPayed = await this.updateProductSaledPayedPort.updateProductSaledPayed(productSaledId)
        return productSaledPayed
    }

}