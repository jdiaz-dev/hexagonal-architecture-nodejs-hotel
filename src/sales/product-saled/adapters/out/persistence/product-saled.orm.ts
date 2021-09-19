import { Service } from 'typedi';
import { DataProductSaled } from '../../../application/services/product-saled-data';
import { ProductSaleRepository } from './product-saled.repository';
import { ProductSalesDatabaseEntity } from './product-saled-database-entity';
import { ProductModel } from '../../../../products/adapters/out/persistence/product.model';

@Service()
export class ProductSaledORM implements ProductSaleRepository {
    async createProductSaled(
        cashId: number,
        houstingId: number,
        productId: number,
        productSaleData: DataProductSaled,
    ): Promise<any> {
        try {
            const productSaled = new ProductSalesDatabaseEntity();
            productSaled.amount = productSaleData.amount;
            productSaled.totalPrice = productSaleData.totalPrice;
            productSaled.date = productSaleData.date;
            productSaled.time = productSaleData.time;
            productSaled.payed = productSaleData.payed;
            productSaled.cashId = cashId;
            productSaled.houstingId = houstingId;
            productSaled.productId = productId;

            await productSaled.save();

            return productSaled;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getProductSaled(productSaledId: number): Promise<any> {
        try {
            const productSaled = await ProductSalesDatabaseEntity.findByPk(productSaledId);
            return productSaled;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getProductsSaled(houstingId: number): Promise<any> {
        try {
            const productSaled: any = await ProductSalesDatabaseEntity.findAll({
                where: { houstingId: houstingId },
                attributes: ['id', 'amount', 'totalPrice', 'date', 'time', 'payed'],
                include: [
                    {
                        model: ProductModel,
                        as: 'product',
                        attributes: ['id', 'name', 'price'],
                    },
                ],
            });
            return productSaled;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async updateAmountToProductSaled(
        productSaledId: number,
        amountProducts: number,
        totalPrice: number,
    ): Promise<any> {
        try {
            const productSaled: any = await ProductSalesDatabaseEntity.findByPk(productSaledId);
            productSaled.amount = amountProducts;
            productSaled.totalPrice = totalPrice;

            await productSaled.save();

            return productSaled;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async updateProductSaledPayed(productSaledId: number): Promise<any> {
        try {
            const productSaled: any = await ProductSalesDatabaseEntity.findByPk(productSaledId);
            productSaled.payed = true;
            await productSaled.save();

            return productSaled;
        } catch (error) {
            console.log('------------', error);
        }
    }
}
