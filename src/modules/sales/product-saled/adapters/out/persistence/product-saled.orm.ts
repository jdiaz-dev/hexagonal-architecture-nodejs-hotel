import { Service } from 'typedi';
import { ProductSaleRepository } from './product-saled.repository';
import { ProductSaledModel } from './product-saled-model';
import { ProductModel } from '../../../../products/adapters/out/persistence/product.model';
import { ProductSaledDomain } from '../../../domain/product-saled';
import { IProductSaledDTO } from '../../../application/ports/in/interfaces/product-saled-dto';
import { HoustingModel } from '../../../../../housting/adapters/out/persistence/housting.model';
import { RoomModel } from '../../../../../configuration-hotel/room/adapters/out/persistence/room.model';

@Service()
export class ProductSaledORM implements ProductSaleRepository {
    async createProductSaled(productsSaledMapped: Array<ProductSaledModel>): Promise<any> {
        try {
            const productsSaledCreated = await ProductSaledModel.bulkCreate(productsSaledMapped);
            return productsSaledCreated;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getProductSaled(productSaledId: number): Promise<any> {
        try {
            const productSaled = await ProductSaledModel.findByPk(productSaledId);
            return productSaled;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getProductsSaled(houstingId: number): Promise<any> {
        try {
            const productSaled: any = await ProductSaledModel.findAll({
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
    async getProductsSaledForReport(cashId: number): Promise<any> {
        try {
            const productsSaledReport: any = await ProductSaledModel.findAndCountAll({
                where: { cashId, payed: 1 },
                attributes: ['id', 'amount', 'totalPrice', 'date', 'time'],
                include: [
                    {
                        model: ProductModel,
                        as: 'product',
                        attributes: ['id', 'name', 'price'],
                    },
                    {
                        model: HoustingModel,
                        as: 'housting',
                        attributes: ['id'],
                        include: [
                            {
                                model: RoomModel,
                                as: 'room',
                                attributes: ['id', 'name'],
                            },
                        ],
                    },
                ],
            });
            return productsSaledReport;
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
            const productSaled: any = await ProductSaledModel.findByPk(productSaledId);
            productSaled.amount = amountProducts;
            productSaled.totalPrice = totalPrice;

            await productSaled.save();

            return productSaled;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async updateProductSaledPayed(productSaledIds: number[]): Promise<any> {
        try {
            const productsSaled: any[] = await ProductSaledModel.findAll({
                where: { id: productSaledIds },
            });
            for (let x = 0; x < productsSaled.length; x++) {
                productsSaled[x].set({ payed: true });
                await productsSaled[x].save();
            }
            return productsSaled;
        } catch (error) {
            console.log('------------', error);
        }
    }
}
