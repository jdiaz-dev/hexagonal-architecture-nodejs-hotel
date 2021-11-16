import { Service } from 'typedi';
import { CreateSaleReportPort } from '../ports/out/self-domain/create-sale-report.port';
import { SaleReportPersistenceAdapter } from '../../adapters/out/persistence/sale-report-persistence.adapter';
import { AddMoneyToSaleReportUseCase } from '../ports/in/add-money-to-sale-report-use-case';
import { UpdateMoneyInSaleReportPort } from '../ports/out/self-domain/update-money-in-sale-report.port';
import { GetSaleReportModeledForSelfDomainPort } from '../ports/out/self-domain/get-sale-report-modeled-for-self-domain.port';
import { SaleReportDomain } from '../../domain/sale-report';

@Service()
export class AddMoneyToSaleReportService implements AddMoneyToSaleReportUseCase {
    //other domains

    //self ports
    private createSaleReportPort: CreateSaleReportPort;
    private getSaleReportModeled: GetSaleReportModeledForSelfDomainPort;
    private updateMoneyInSaleReportPort: UpdateMoneyInSaleReportPort;

    constructor(
        //other domains

        //self ports
        saleReportPersistenceAdapter: SaleReportPersistenceAdapter,
    ) {
        this.createSaleReportPort = saleReportPersistenceAdapter;
        this.updateMoneyInSaleReportPort = saleReportPersistenceAdapter;
        this.getSaleReportModeled = saleReportPersistenceAdapter;
    }

    async addMoneyToSaleReport(houstingId: number, productsSaled: Array<any>): Promise<any> {
        let saleReport: SaleReportDomain = await this.getSaleReportModeled.getSaleReportModeledForSelfDomain(
            houstingId,
        );

        if (saleReport.getSaleReportId == 0) {
            saleReport = await this.createSaleReportPort.createSaleReport(houstingId, 0);
        }

        for (let x = 0; x < productsSaled.length; x++) {
            saleReport.addMoney(productsSaled[x].totalPrice);
        }
        const productsSaledReport = await this.updateMoneyInSaleReportPort.updateMoneyInSaleReport(saleReport);
        return productsSaledReport;
    }
}
