import { Service } from 'typedi';
import { Request, Response } from 'express';

import { CreateProductRequest } from '../../../application/ports/in/create-product.request';
import { CreateProductService } from '../../../application/services/create-product.service';
import { DataProduct } from '../../../application/services/data-product';
import { GetProductsRequest } from '../../../application/ports/in/get-products.reques';
import { GetProductsService } from '../../../application/services/get-products.service';
import { UpdateProductRequest } from '../../../application/ports/in/update-product.request';
import { UpdateProductService } from '../../../application/services/update-product.service';
import { ProductCommand } from '../../../application/ports/in/product.command';
import { RemoveProductRequest } from '../../../application/ports/in/remove-product.request';
import { RemoveProductService } from '../../../application/services/remove-product.service';
import { IQueries } from '../../../../../shared/interfaces/query.interface';
import { SETTINGS } from '../../../../../shared/settings/settings';

@Service()
export class ProductController {
    private createProductRequest: CreateProductRequest;
    private getProductsRequest: GetProductsRequest;
    private updateProductRequest: UpdateProductRequest;
    private removeProductRequest: RemoveProductRequest;

    constructor(
        createProductService: CreateProductService,
        getProductsService: GetProductsService,
        updateProductService: UpdateProductService,
        removeProductService: RemoveProductService,
    ) {
        this.createProductRequest = createProductService;
        this.getProductsRequest = getProductsService;
        this.updateProductRequest = updateProductService;
        this.removeProductRequest = removeProductService;
    }

    createProduct = async (req: Request, res: Response) => {
        const { hotelId } = req.params;
        const { code, name, brand, details = '', price } = req.body;

        const productCreated = await this.createProductRequest.createTheProduct(
            parseInt(hotelId),
            new DataProduct(code, name, brand, details, parseFloat(price)),
        );
        res.json(productCreated);
    };
    getProducts = async (req: Request, res: Response) => {
        const { hotelId } = req.params;
        const {
            limit = SETTINGS.base.queries.limit,
            offset = SETTINGS.base.queries.offset,
            orderby = SETTINGS.base.queries.orderBy,
        } = req.query as unknown as IQueries;

        const queries: IQueries = {
            limit: Number(limit),
            offset: Number(offset),
            orderby,
        };
        const productCreated = await this.getProductsRequest.getTheProducts(parseInt(hotelId), queries);
        res.json(productCreated);
    };
    updateProduct = async (req: Request, res: Response) => {
        const { hotelId, productId } = req.params;
        const { code, name, brand, details = '', price } = req.body;

        const productCreated = await this.updateProductRequest.updateTheProduct(
            parseInt(productId),
            new DataProduct(code, name, brand, details, parseFloat(price)),
            new ProductCommand(parseInt(hotelId)),
        );
        res.json(productCreated);
    };
    removeProduct = async (req: Request, res: Response) => {
        const { hotelId, productId } = req.params;

        const productRemoved = await this.removeProductRequest.removeTheProduct(
            parseInt(productId),
            new ProductCommand(parseInt(hotelId)),
        );
        res.json(productRemoved);
    };
}
