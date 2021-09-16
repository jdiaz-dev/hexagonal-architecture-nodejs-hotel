import { Service } from 'typedi';

import { DataProductSaled } from '../../../application/services/product-saled-data';
import { CreateProductSalePort } from '../../../application/ports/out/self-domain/create-product-saled';
import { UpdateAmountToProductSaledPort } from '../../../application/ports/out/self-domain/update-amount-to-product-saled.port';
import { ProductSaledORM } from './product-saled.orm';
import { GetProductSaledPort } from '../../../application/ports/out/self-domain/get-product-sale.port';
import { GetProductSaledModeledPort } from '../../../application/ports/out/self-domain/get-product-saled-modeled.port';
import { ProductsSaledRelationDomainEntity } from '../../../domain/products-saled-relations';
import { UpdateProductSaledPayedPort } from '../../../application/ports/out/self-domain/upate-product-saled-payed.port';
import { GetProductsSaledPort } from '../../../application/ports/out/self-domain/get-products-saled.port';

@Service()
export class ProductSalePersistenceAdapter
    implements
        CreateProductSalePort,
        GetProductSaledPort,
        GetProductSaledModeledPort,
        GetProductsSaledPort,
        UpdateAmountToProductSaledPort,
        UpdateProductSaledPayedPort
{
    constructor(private productSaledORM: ProductSaledORM) {}

    async createProductSaled(
        cashId: number,
        houstingId: number,
        productId: number,
        productSaleData: DataProductSaled,
    ): Promise<any> {
        const productsSaled = await this.productSaledORM.createProductSaled(
            cashId,
            houstingId,
            productId,
            productSaleData,
        );

        return productsSaled;
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
    async updateProductSaledPayed(productSaledId: number): Promise<any> {
        const productPayed = await this.productSaledORM.updateProductSaledPayed(productSaledId);
        return productPayed;
    }
}
