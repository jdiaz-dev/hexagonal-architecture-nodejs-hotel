import { Service } from 'typedi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { Request, Response } from 'express';
import { CreateProductSaledRequest } from '../../../application/ports/in/create-product-saled.request';
import { CreateProductSaledService } from '../../../application/services/create-product-saled.service';
import { DataProductSaled } from '../../../application/services/product-saled-data';

import { UpdateAmountToProductsSaledService } from '../../../application/services/update-amount-to-products-saled.service';
import { UpdateAmountToProductSaledUseCase } from '../../../application/ports/in/update-amount-to-product-saled.request';
import { FinishPaymentProductSaledUseCase } from '../../../application/ports/in/finish-payment-product-saled-use-case';
import { CompleteProductSaledPaymentService } from '../../../application/services/update-payment-product-saled.service';
import { GetProductsSaledRequest } from '../../../application/ports/in/get-products-saled.request';
import { GetProductsSaledService } from '../../../application/services/get-products-saled.service';

@Service()
export class ProductSaledController {
    private createProductSaledRequest: CreateProductSaledRequest;
    private updateAmountToProductSaledUseCase: UpdateAmountToProductSaledUseCase;
    private finishPaymentProductSaledUseCase: FinishPaymentProductSaledUseCase;
    private getProductsSaledRequest: GetProductsSaledRequest;

    constructor(
        createProductSaledService: CreateProductSaledService,
        updateAmountToProductsSaledService: UpdateAmountToProductsSaledService,
        completeProductSaledPaymentService: CompleteProductSaledPaymentService,
        getProductsSaledService: GetProductsSaledService,
    ) {
        this.createProductSaledRequest = createProductSaledService;
        this.updateAmountToProductSaledUseCase = updateAmountToProductsSaledService;
        this.finishPaymentProductSaledUseCase = completeProductSaledPaymentService;
        this.getProductsSaledRequest = getProductsSaledService;
    }
    createProductsSaled = async (req: Request, res: Response) => {
        const { cashId, houstingId, productId } = req.params;
        const { amount, date, time, payed } = req.body;

        const dataProductSaled = new DataProductSaled(
            parseInt(amount),
            0, //total price
            date,
            time,
            parseInt(payed) === 1 ? true : false,
        );

        const productSaled = await this.createProductSaledRequest.createTheProductSale(
            parseInt(cashId),
            parseInt(houstingId),
            parseInt(productId),
            dataProductSaled,
        );
        res.json(productSaled);
    };
    getProductsSaled = async (req: Request, res: Response) => {
        const { houstingId } = req.params;
        const productsSaled = await this.getProductsSaledRequest.getTheProductsSaled(parseInt(houstingId));
        res.json(productsSaled);
    };
    /* updateAmountProductSaled = async (req: Request, res: Response) => {
        const { productSaledId } = req.params;
        const { amount, payed } = req.body;

        const productSaled = await this.updateAmountToProductSaledUseCase.updateTheAmountToProductSaled(
            parseInt(productSaledId),
            parseInt(amount),
        );
        res.json(productSaled);
    }; */
    completeProductSaledPayment = async (req: Request, res: Response) => {
        const { productSaledId } = req.params;

        const productSaled = await this.finishPaymentProductSaledUseCase.finishPaymentProductSaled(
            parseInt(productSaledId),
        );

        res.json(productSaled);
    };
}
