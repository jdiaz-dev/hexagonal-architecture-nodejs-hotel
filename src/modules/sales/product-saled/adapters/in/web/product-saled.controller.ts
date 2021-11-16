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
import { AddMoneyToSaleReportUseCase } from '../../../../../reports/sale-reports/application/ports/in/add-money-to-sale-report-use-case';
import { AddMoneyToCashService } from '../../../../../cash/application/services/add-money-to-cash-due-housting.service';
import { AddMoneyToHoustingReportDueProductsUseCase } from '../../../../../reports/housting-reports/application/ports/in/add-money-to-housting-report-due-products-use-case';
import { AddMoneyToHoustingReportService } from '../../../../../reports/housting-reports/application/services/add-money-to-housting-report.service';
import { CreateProductSaledCommand } from '../../../application/ports/in/create-products.saled.command';
import { AddMoneyToCashDueSalesUseCase } from '../../../../../cash/application/ports/in/add-money-to-cash-due-products-use-case';
import { IGetProductsSaledForReportUseCase } from '../../../application/ports/in/get-products-saled-for-report-use-case';
import { GetProductsSaledForReport } from '../../../application/services/get-products-saled-for-report.service';
import { AddMoneyToCashDueSalesService } from '../../../../../cash/application/services/add-money-to-cash-due-sales.service';
import { AddMoneyToDailyReportDueSalesService } from '../../../../../reports/daily-reports/application/services/add-money-to-daily-report-due-sales.service';
import { IAddMoneyToDailyReportDueSalesUseCase } from '../../../../../reports/daily-reports/application/ports/in/add-money-to-daily-report-due-sales.port';

@Service()
export class ProductSaledController {
    private createProductsSaledUseCase: CreateProductsSaledUseCase;
    private updateAmountToProductSaledUseCase: UpdateAmountToProductSaledUseCase;
    private completePaymentProductSaledUseCase: CompletePaymentProductSaledUseCase;
    private getProductsSaledRequest: GetProductsSaledRequest;
    private getProductsSaledForReportUseCase: IGetProductsSaledForReportUseCase;

    //other domain
    private addMoneyToCashDueSalesUseCase: AddMoneyToCashDueSalesUseCase;
    private addMoneyToSaleReportUseCase: AddMoneyToSaleReportUseCase;
    private addMoneyToHoustingReportDueProducts: AddMoneyToHoustingReportDueProductsUseCase;
    private addMoneyToDailyReportDueSales: IAddMoneyToDailyReportDueSalesUseCase;

    constructor(
        createProductSaledService: CreateProductSaledService,
        updateAmountToProductsSaledService: UpdateAmountToProductsSaledService,
        completePaymentProductSaledService: CompletePaymentProductSaledService,
        getProductsSaledService: GetProductsSaledService,
        getProductsSaledForReport: GetProductsSaledForReport,

        //other domains
        addMoneyToCashDueSalesService: AddMoneyToCashDueSalesService,
        addMoneyToHoustingReportService: AddMoneyToHoustingReportService,
        addMoneyToSaleReportService: AddMoneyToSaleReportService,
        addMoneyToDailyReportDueSalesService: AddMoneyToDailyReportDueSalesService,
    ) {
        this.createProductsSaledUseCase = createProductSaledService;
        this.updateAmountToProductSaledUseCase = updateAmountToProductsSaledService;
        this.completePaymentProductSaledUseCase = completePaymentProductSaledService;
        this.getProductsSaledRequest = getProductsSaledService;
        this.getProductsSaledForReportUseCase = getProductsSaledForReport;

        //other domain
        this.addMoneyToCashDueSalesUseCase = addMoneyToCashDueSalesService;
        this.addMoneyToSaleReportUseCase = addMoneyToSaleReportService;
        this.addMoneyToHoustingReportDueProducts = addMoneyToHoustingReportService;
        this.addMoneyToDailyReportDueSales = addMoneyToDailyReportDueSalesService;
    }
    createProductSaled = async (req: Request, res: Response) => {
        const { hotelId, cashId, houstingId } = req.params;
        const { productsSaled } = req.body;

        const _hotelId = parseInt(hotelId),
            _houstingId = parseInt(houstingId),
            _cashId = parseInt(cashId);

        const command = new CreateProductSaledCommand(_cashId, _houstingId, productsSaled);
        command.mapToProductSaledDomain();
        const prodsSaled = await this.createProductsSaledUseCase.createTheProductsSaled(command);

        if (prodsSaled[0].payed) {
            const moneyTotalAdded: number = await this.addMoneyToCashDueSalesUseCase.addMoneyToCashDueProducts(
                _cashId,
                prodsSaled,
            );
            const productsSaledReport = await this.addMoneyToSaleReportUseCase.addMoneyToSaleReport(
                _houstingId,
                prodsSaled,
            );
            this.addMoneyToHoustingReportDueProducts.addMoneyToHoustingReportDueProducts(
                _houstingId,
                productsSaledReport.id,
                prodsSaled,
            );
            this.addMoneyToDailyReportDueSales.addMoneyDueSales(_hotelId, _cashId, moneyTotalAdded);
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
        const { hotelId, houstingId, productSaledIds, cashId } = req.params;
        const _hotelId = parseInt(hotelId),
            _cashId = parseInt(cashId),
            _houstingId = parseInt(houstingId);
        const _productSaledIds = productSaledIds.split(',').map((productSaledId) => parseInt(productSaledId));

        const productsSaled = await this.completePaymentProductSaledUseCase.completePaymentProductSaled(
            _productSaledIds,
        );

        const moneyTotalAdded: number = await this.addMoneyToCashDueSalesUseCase.addMoneyToCashDueProducts(
            _cashId,
            productsSaled,
        );
        const productsSaledReport = await this.addMoneyToSaleReportUseCase.addMoneyToSaleReport(
            _houstingId,
            productsSaled,
        );

        this.addMoneyToHoustingReportDueProducts.addMoneyToHoustingReportDueProducts(
            _houstingId,
            productsSaledReport.id,
            productsSaled,
        );
        this.addMoneyToDailyReportDueSales.addMoneyDueSales(_hotelId, _cashId, moneyTotalAdded);

        res.json(productsSaled);
    };
}
