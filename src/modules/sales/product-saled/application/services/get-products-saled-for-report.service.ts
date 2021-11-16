import { Service } from 'typedi';
import { ProductSaledPersistenceAdapter } from '../../adapters/out/persistence/product-saled-persistence.adapter';
import { IGetProductsSaledForReportUseCase } from '../ports/in/get-products-saled-for-report-use-case';
import { IGetProductsSaledForReportPort } from '../ports/out/self-domain/get-products-saled-for-report.port';

@Service()
export class GetProductsSaledForReport implements IGetProductsSaledForReportUseCase {
    private getProductsSaledForReportPort: IGetProductsSaledForReportPort;
    constructor(productSaledPersistenceAdapter: ProductSaledPersistenceAdapter) {
        this.getProductsSaledForReportPort = productSaledPersistenceAdapter;
    }
    async getTheProductsSaledForReport(cashId: number): Promise<any> {
        const productsSaledForReport = await this.getProductsSaledForReportPort.getProductsSaledForReport(cashId);
        return productsSaledForReport;
    }
}
