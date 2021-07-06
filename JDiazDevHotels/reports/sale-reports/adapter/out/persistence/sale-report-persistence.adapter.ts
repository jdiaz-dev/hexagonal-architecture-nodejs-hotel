import { Service } from "typedi";
import { CreateSaleReportPort } from './../../../application/ports/out/self-domain/create-sale-report.port';
import { SaleReportORM } from './sale-report.orm';

@Service()
export class SaleReportPersistenceAdapter implements CreateSaleReportPort {
    constructor(private saleReportORM:SaleReportORM){}

    async createSaleReport(moneyTotal:number):Promise<any>{
        const saleReport = await this.saleReportORM.createSaleReport(moneyTotal)
        return saleReport
    }
}

