import { Service } from 'typedi';
import { IProductSaledDTO } from '../../../application/ports/in/interfaces/product-saled-dto';
import { ProductSaledDomain } from '../../../domain/product-saled';
import { ProductSaledModel } from './product-saled-model';

@Service()
export class ProductSaledMapper {
    mapToSequelizeModel(
        productSaled: Array<{ _productSaledDomain: ProductSaledDomain; productSaledDTO: IProductSaledDTO }>,
    ) {
        const theProductsSaled: Array<any> = [];

        productSaled.forEach((element) => {
            let prodSaled = {
                amount: element._productSaledDomain.getAmmount,
                totalPrice: element._productSaledDomain.getTotalPrice,
                date: element.productSaledDTO.date,
                time: element.productSaledDTO.time,
                cashId: element.productSaledDTO.cashId,
                houstingId: element.productSaledDTO.houstingId,
                productId: element._productSaledDomain.getProductId.value,
                payed: element.productSaledDTO.payed,
            };

            theProductsSaled.push(prodSaled);
        });

        return theProductsSaled;
    }
}
