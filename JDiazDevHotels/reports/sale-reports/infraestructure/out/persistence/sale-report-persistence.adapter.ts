import { Service } from "typedi";
import { CreateSaleReportPort } from '../../../application/ports/out/self-domain/create-sale-report.port';
import { SaleReportORM } from './sale-report.orm';
import { GetSaleReportPort } from '../../../application/ports/out/self-domain/get-sale-report.port';

@Service()
export class SaleReportPersistenceAdapter implements
    CreateSaleReportPort,
    GetSaleReportPort {
    constructor(private saleReportORM: SaleReportORM) { }

    async createSaleReport(moneyTotal: number): Promise<any> {
        const saleReport = await this.saleReportORM.createSaleReport(moneyTotal)
        return saleReport
    }
    async getSaleReport(houstingId: number): Promise<any> {
        const saleReport = await this.saleReportORM.getSaleReport(houstingId)
        return saleReport
    }
}

