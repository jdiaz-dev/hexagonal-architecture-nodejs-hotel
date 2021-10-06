import { ProductSaledDomain } from '../../../../domain/product-saled';
import { IProductSaledDTO } from './product-saled-dto';

export interface IProductSaledPayload {
    productId: typeof ProductSaledDomain.ProductId.prototype;
    ammount: number;
    productSaledDTO: IProductSaledDTO;
}
