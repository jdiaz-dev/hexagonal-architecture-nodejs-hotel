import { Service } from "typedi";
import { ProductPersistenceAdapter } from "../../infraestructure/out/persistence/product-persistence.adapter";
import { ProductDomianEntity } from "../../domain/product";
import { ProductCommand } from "../ports/in/product.command";
import { GetProductModeledPort } from "../ports/out/self-domain/get-product-modeled.port";
import { RemoveProductRequest } from '../ports/in/remove-product.request';
import { RemoveProductPort } from '../ports/out/self-domain/remove-product.port';

@Service()
export class RemoveProductService implements RemoveProductRequest {
    private getProductModeledPort: GetProductModeledPort
    private removeProductPort: RemoveProductPort

    constructor(
        productPersistenceAdapter: ProductPersistenceAdapter
    ) {
        this.getProductModeledPort = productPersistenceAdapter
        this.removeProductPort = productPersistenceAdapter
    }
    async removeTheProduct(productId: number, command: ProductCommand): Promise<any> {
        const product: ProductDomianEntity = await this.getProductModeledPort.getProductModeled(productId)

        if (!product.checkIfProductBelongsToHotel(command.getHotelId)) {
            return { message: 'You cannot update the product' }
        }

        const productRemoved = await this.removeProductPort.removeProduct(productId)

        if (!productRemoved.state === false) {
            return { message: 'A problem triying to remove product has ocurred' }
        }
        return { message: 'Product removed successly' }
    }
}