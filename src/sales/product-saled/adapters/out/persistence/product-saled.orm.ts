import { Service } from 'typedi';
import { ProductSaleRepository } from './product-saled.repository';
import { ProductSalesDatabaseEntity } from './product-saled-database-entity';
import { ProductModel } from '../../../../products/adapters/out/persistence/product.model';
import { ProductSaledDomain } from '../../../domain/product-saled';
import { IProductSaledDTO } from './../../../application/ports/in/create-products.saled.command';

@Service()
export class ProductSaledORM implements ProductSaleRepository {
    async createProductSaled(_productSaled: ProductSaledDomain, productSaledDTO: IProductSaledDTO): Promise<any> {
        try {
            //ProductSalesDatabaseEntity.bulkCreate()

            const productSaled = new ProductSalesDatabaseEntity();
            productSaled.amount = _productSaled.getAmmount;
            productSaled.totalPrice = _productSaled.getTotalPrice;
            productSaled.date = productSaledDTO.date;
            productSaled.time = productSaledDTO.time;
            productSaled.payed = productSaledDTO.payed;
            productSaled.cashId = productSaledDTO.cashId;
            productSaled.houstingId = productSaledDTO.houstingId;
            productSaled.productId = _productSaled.getProductId.value;

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
