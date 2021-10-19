import { Service } from 'typedi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { Request, Response } from 'express';
import { CreateProductsSaledUseCase } from '../../../application/ports/in/create-products-saled-use-case';
import { CreateProductSaledService } from '../../../application/services/create-product-saled.service';

import { UpdateAmountToProductsSaledService } from '../../../application/services/update-amount-to-products-saled.service';
import { UpdateAmountToProductSaledUseCase } from '../../../application/ports/in/update-amount-to-product-saled.request';
import { CompletePaymentProductSaledUseCase } from '../../../application/ports/in/complete-payment-product-saled-use-case';
import { CompletePaymentProductSaledService } from '../../../application/services/complete-product-saled-payment.service';
import { GetProductsSaledRequest } from '../../../application/ports/in/get-products-saled.request';
import { GetProductsSaledService } from '../../../application/services/get-products-saled.service';
import { AddMoneyToSaleReportService } from '../../../../../reports/sale-reports/application/services/add-money-to-sale-report.service';
import { AddMoneyToSaleReportUseCase } from './../../../../../reports/sale-reports/application/ports/in/add-money-to-sale-report-use-case';
import { AddMoneyToCashService } from '../../../../../cash/application/services/add-money-to-cash.service';
import { AddMoneyToHoustingReportDueProductsUseCase } from '../../../../../reports/housting-reports/application/ports/in/add-money-to-housting-report-due-products-use-case';
import { AddMoneyToHoustingReportService } from '../../../../../reports/housting-reports/application/services/add-money-to-housting-report.service';
import { CreateProductSaledCommand } from '../../../application/ports/in/create-products.saled.command';
import { AddMoneyToCashDueProductsUseCase } from './../../../../../cash/application/ports/in/add-money-to-cash-due-products-use-case';
import { IGetProductsSaledForReportUseCase } from '../../../application/ports/in/get-products-saled-for-report-use-case';
import { GetProductsSaledForReport } from '../../../application/services/get-products-saled-for-report.service';

@Service()
export class ProductSaledController {
    private createProductsSaledUseCase: CreateProductsSaledUseCase;
    private updateAmountToProductSaledUseCase: UpdateAmountToProductSaledUseCase;
    private completePaymentProductSaledUseCase: CompletePaymentProductSaledUseCase;
    private getProductsSaledRequest: GetProductsSaledRequest;
    private getProductsSaledForReportUseCase: IGetProductsSaledForReportUseCase;

    //other domain
    private addMoneyToCashDueProductsUseCase: AddMoneyToCashDueProductsUseCase;
    private addMoneyToSaleReportUseCase: AddMoneyToSaleReportUseCase;
    private addMoneyToHoustingReportDueProducts: AddMoneyToHoustingReportDueProductsUseCase;

    constructor(
        createProductSaledService: CreateProductSaledService,
        updateAmountToProductsSaledService: UpdateAmountToProductsSaledService,
        completePaymentProductSaledService: CompletePaymentProductSaledService,
        getProductsSaledService: GetProductsSaledService,
        getProductsSaledForReport: GetProductsSaledForReport,

        //other domains
        addMoneyToCashService: AddMoneyToCashService,
        addMoneyToHoustingReportService: AddMoneyToHoustingReportService,
        addMoneyToSaleReportService: AddMoneyToSaleReportService,
    ) {
        this.createProductsSaledUseCase = createProductSaledService;
        this.updateAmountToProductSaledUseCase = updateAmountToProductsSaledService;
        this.completePaymentProductSaledUseCase = completePaymentProductSaledService;
        this.getProductsSaledRequest = getProductsSaledService;
        this.getProductsSaledForReportUseCase = getProductsSaledForReport;

        //other domain
        this.addMoneyToCashDueProductsUseCase = addMoneyToCashService;
        this.addMoneyToSaleReportUseCase = addMoneyToSaleReportService;
        this.addMoneyToHoustingReportDueProducts = addMoneyToHoustingReportService;
    }
    createProductSaled = async (req: Request, res: Response) => {
        const { cashId, houstingId } = req.params;
        const { productsSaled } = req.body;

        const _houstingId = parseInt(houstingId),
            _cashId = parseInt(cashId);

        const command = new CreateProductSaledCommand(_cashId, _houstingId, productsSaled);
        command.mapToProductSaledDomain();
        const prodsSaled = await this.createProductsSaledUseCase.createTheProductsSaled(command);

        if (prodsSaled[0].payed) {
            this.addMoneyToCashDueProductsUseCase.addMoneyToCashDueProducts(_cashId, prodsSaled);
            const productsSaledReport = await this.addMoneyToSaleReportUseCase.addMoneyToSaleReport(
                _houstingId,
                prodsSaled,
            );
            this.addMoneyToHoustingReportDueProducts.addMoneyToHoustingReportDueProducts(
                _houstingId,
                productsSaledReport.id,
                prodsSaled,
            );
        }

        res.json({ productsSaled: prodsSaled });
    };
    getProductsSaled = async (req: Request, res: Response) => {
        const { houstingId } = req.params;
        const productsSaled = await this.getProductsSaledRequest.getTheProductsSaled(parseInt(houstingId));
        res.json(productsSaled);
    };
    getProductsSaledForReport = async (req: Request, res: Response) => {
        const { cashId } = req.params;
        const productsSaled = await this.getProductsSaledForReportUseCase.getTheProductsSaledForReport(
            parseInt(cashId),
        );
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
        const { houstingId, productSaledIds, cashId } = req.params;
        const _productSaledIds = productSaledIds.split(',').map((productSaledId) => parseInt(productSaledId));
        const _houstingId = parseInt(houstingId);

        const productsSaled = await this.completePaymentProductSaledUseCase.completePaymentProductSaled(
            _productSaledIds,
        );

        this.addMoneyToCashDueProductsUseCase.addMoneyToCashDueProducts(parseInt(cashId), productsSaled);
        const productsSaledReport = await this.addMoneyToSaleReportUseCase.addMoneyToSaleReport(
            _houstingId,
            productsSaled,
        );

        this.addMoneyToHoustingReportDueProducts.addMoneyToHoustingReportDueProducts(
            _houstingId,
            productsSaledReport.id,
            productsSaled,
        );

        res.json(productsSaled);
    };
}
