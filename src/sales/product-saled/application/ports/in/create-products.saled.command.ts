import { ProductSaledDomain } from '../../../domain/product-saled';

export interface IProductSaledDTO {
    date: string;
    time: string;
    payed: boolean;
    cashId: number;
    houstingId: number;
}

export interface IProductSaledPayload {
    productId: typeof ProductSaledDomain.ProductId.prototype;
    ammount: number;
    productSaledDTO: IProductSaledDTO;
}
export class CreateProductSaledCommand {
    private payload: Array<IProductSaledPayload> = [];

    constructor(private productsSaled: any) {}

    mapToProductSaledDomain() {
        let productId, ammount, productSaledDTO;

        this.productsSaled.forEach((element: any) => {
            productId = new ProductSaledDomain.ProductId(element.productId);
            ammount = element.ammount;
            productSaledDTO = {
                date: element.date,
                time: element.time,
                payed: element.payed,
                cashId: element.cashId,
                houstingId: element.houstingId,
            };
            this.payload.push({ productId, ammount, productSaledDTO });
        });
    }
    get getPayload() {
        return this.payload;
    }
}
