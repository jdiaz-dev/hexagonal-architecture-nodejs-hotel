import { ProductSaledDomain } from '../../../../domain/product-saled';
import { IProductSaledDTO } from './product-saled-dto';

export interface IProductSaledPayload {
    productId: typeof ProductSaledDomain.ProductId.prototype;
    amount: number;
    productSaledDTO: IProductSaledDTO;
}
