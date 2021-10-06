import { ProductSaledDomain } from '../../../domain/product-saled';
import { IProductSaledPayload } from './interfaces/product-saled-payload';

export class CreateProductSaledCommand {
    private payload: Array<IProductSaledPayload> = [];

    constructor(private cashId: number, private houstingId: number, private productsSaled: any[]) {}

    mapToProductSaledDomain() {
        let productId, ammount, productSaledDTO;
        this.productsSaled.forEach((element: any) => {
            productId = new ProductSaledDomain.ProductId(element.productId);
            ammount = element.ammount;
            productSaledDTO = {
                date: element.date,
                time: element.time,
                payed: element.payed === 1 ? true : false,
                cashId: this.cashId,
                houstingId: this.houstingId,
            };
            this.payload.push({ productId, ammount, productSaledDTO });
        });
    }
    get getPayload() {
        return this.payload;
    }
}
