import { DataProductSaled } from '../../services/product-saled-data';

export interface CreateProductSaledRequest {
    createTheProductSaled(
        cashId: number,
        houstingId: number,
        productId: number,
        productSaleData: DataProductSaled,
    ): Promise<any>;
}
