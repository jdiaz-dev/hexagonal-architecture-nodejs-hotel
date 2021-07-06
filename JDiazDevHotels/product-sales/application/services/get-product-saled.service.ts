import { Service } from "typedi";

import { GetProductSaledForMiddleware } from "../../adapter/in/web/interfaces/get-products-saled-for-middleware";
import { ProductSalePersistenceAdapter } from '../../adapter/out/persistence/product-sale-persistence.adapter';
import { GetProductSaledModeledPort } from '../ports/out/self-domain/get-product-saled-modeled.port';

@Service()
export class GetProductSaledService implements GetProductSaledForMiddleware {
    private getProductSaledModeledPort:GetProductSaledModeledPort

    constructor(productSalePersistenceAdapter:ProductSalePersistenceAdapter){
        this.getProductSaledModeledPort = productSalePersistenceAdapter
    }
    async getProductSaledForMiddleware(productsSaledId:number):Promise<any>{
        const producstSaled = await this.getProductSaledModeledPort.getProductSaledModeled(productsSaledId)
        return producstSaled
    }
}


