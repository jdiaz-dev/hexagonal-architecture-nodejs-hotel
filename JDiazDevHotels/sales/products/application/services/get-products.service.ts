import { Service } from "typedi";
import { ProductPersistenceAdapter } from "../../adapter/out/persistence/product-persistence.adapter";
import { GetProductsRequest } from "../ports/in/get-products.reques";
import { GetProductsPort } from "../ports/out/self-domain/get-products.port";

@Service()
export class GetProductsService implements GetProductsRequest{
    private getProductsPort:GetProductsPort

    constructor(productPersistenceAdapter:ProductPersistenceAdapter){
        this.getProductsPort = productPersistenceAdapter
    }
    async getTheProducts(hotelId:number):Promise<any>{
        const products = await this.getProductsPort.getProducts(hotelId)
        return products
    }
}