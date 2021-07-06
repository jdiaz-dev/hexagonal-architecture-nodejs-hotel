import { ProductsSaledRelationDomainEntity } from '../../../../domain/products-saled-relations';

export interface GetProductSaledModeledPort {
    getProductSaledModeled(productsSaledId:number):Promise<ProductsSaledRelationDomainEntity>
}