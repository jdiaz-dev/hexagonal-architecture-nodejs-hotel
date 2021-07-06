import { Service } from "typedi";
import { SaleReportRepository } from './sale-report.repository';
import { SaleReportDatabaseEntity } from './sale-report-database-entity';

@Service()
export class SaleReportORM implements SaleReportRepository{
    async createSaleReport(moneyTotal:number):Promise<any>{
        try {
            const saleReport = new SaleReportDatabaseEntity()
            saleReport.total = moneyTotal
            await saleReport.save()

            return saleReport
        } catch (error) {
            console.log('-----------------', error)
        }
    }
}