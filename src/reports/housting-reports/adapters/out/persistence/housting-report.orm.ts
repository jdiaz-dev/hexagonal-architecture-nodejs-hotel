import { Service } from "typedi";
import { HoustingReportDatabaseEntity } from "./housting-report-database-entity";
import { HoustingReportRepository } from "./housting-report.repository";


@Service()
export class HoustingReportORM implements HoustingReportRepository {
    async createHoustingReport(houstingId:number, saleReportId:number|null, moneyTotal:number):Promise<any>{
        try {
            const houstingReport = new HoustingReportDatabaseEntity()
            houstingReport.houstingId = houstingId
            houstingReport.total = moneyTotal
            houstingReport.saleReportId = saleReportId
            await houstingReport.save()

            return houstingReport

        } catch (error) {
            console.log('------------', error)
        }
    }
}