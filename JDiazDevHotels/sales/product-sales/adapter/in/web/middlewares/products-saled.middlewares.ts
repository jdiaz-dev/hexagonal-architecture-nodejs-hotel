import { Service } from "typedi";
import { Request, Response, NextFunction } from 'express'

import { GetProductSaledService } from '../../../../application/services/get-product-saled.service';
import { GetProductSaledForMiddleware } from '../interfaces/get-products-saled-for-middleware';
import { ProductsSaledRelationDomainEntity } from "../../../../domain/products-saled-relations";

@Service()
export class ProductSaledMiddlewares {
    private getProductSaledForMiddleware: GetProductSaledForMiddleware

    constructor(
        getProductSaledService: GetProductSaledService
    ) {
        this.getProductSaledForMiddleware = getProductSaledService
    }
    checkIfProductsSaledRelationsIsCompliment = async (req: Request | any, res: Response, next: NextFunction) => {
        const { cashId, houstingId, productSaledId } = req.params

        const productsSaledModeled: ProductsSaledRelationDomainEntity = await this.getProductSaledForMiddleware.getProductSaledForMiddleware(parseInt(productSaledId))

        if (!productsSaledModeled.checkIfProductsSaledBelongsToCash(parseInt(cashId))) {
            return res.json({ message: 'You cannot access to product saled, proble with cash' })
        }

        if (!productsSaledModeled.checkIfProductsSaledBelongsToHousting(parseInt(houstingId))) {
            return res.json({ message: 'You cannot access to product saled, proble with housting' })
        }
        next()
    }

}

