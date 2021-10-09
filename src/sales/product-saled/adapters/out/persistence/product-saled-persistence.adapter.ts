import { Service } from 'typedi';

import { CreateProductSalePort } from '../../../application/ports/out/self-domain/create-product-saled';
import { UpdateAmountToProductSaledPort } from '../../../application/ports/out/self-domain/update-amount-to-product-saled.port';
import { ProductSaledORM } from './product-saled.orm';
import { GetProductSaledPort } from '../../../application/ports/out/self-domain/get-product-sale.port';
import { GetProductSaledModeledPort } from '../../../application/ports/out/self-domain/get-product-saled-modeled.port';
import { ProductsSaledRelationDomainEntity } from '../../../domain/products-saled-relations';
import { UpdateProductSaledPayedPort } from '../../../application/ports/out/self-domain/upate-product-saled-payed.port';
import { GetProductsSaledPort } from '../../../application/ports/out/self-domain/get-products-saled.port';
import { ProductSaledDomain } from '../../../domain/product-saled';
import { IProductSaledDTO } from '../../../application/ports/in/interfaces/product-saled-dto';
import { ProductSaledMapper } from './product-saled.mappper';

@Service()
export class ProductSaledPersistenceAdapter
    implements
        CreateProductSalePort,
        GetProductSaledPort,
        GetProductSaledModeledPort,
        GetProductsSaledPort,
        UpdateAmountToProductSaledPort,
        UpdateProductSaledPayedPort
{
    constructor(private productSaledORM: ProductSaledORM, private productSaledMapper: ProductSaledMapper) {}

    async createProductSaled(
        productsSaled: Array<{ _productSaledDomain: ProductSaledDomain; productSaledDTO: IProductSaledDTO }>,
    ): Promise<any> {
        const productsSaledMapped = this.productSaledMapper.mapToSequelizeModel(productsSaled);
        const productsSaledCreated = await this.productSaledORM.createProductSaled(productsSaledMapped);

        return productsSaledCreated;
    }
    async updateAmountToProductSaled(
        productsSaledId: number,
        amountProducts: number,
        totalPrice: number,
    ): Promise<any> {
        const productsSaled = await this.productSaledORM.updateAmountToProductSaled(
            productsSaledId,
            amountProducts,
            totalPrice,
        );
        return productsSaled;
    }
    async getProductSaled(productsSaledId: number): Promise<any> {
        const productsSaled = await this.productSaledORM.getProductSaled(productsSaledId);
        return productsSaled;
    }
    async getProductsSaled(houstingId: number): Promise<any> {
        const productsSaled = await this.productSaledORM.getProductsSaled(houstingId);
        return productsSaled;
    }
    async getProductSaledModeled(productsSaledId: number): Promise<ProductsSaledRelationDomainEntity> {
        const productsSaled = await this.productSaledORM.getProductSaled(productsSaledId);
        return new ProductsSaledRelationDomainEntity(productsSaled.cashId, productsSaled.houstingId);
    }
    async updateProductSaledPayed(productSaledIds: number[]): Promise<any> {
        const productPayed = await this.productSaledORM.updateProductSaledPayed(productSaledIds);
        return productPayed;
    }
}
