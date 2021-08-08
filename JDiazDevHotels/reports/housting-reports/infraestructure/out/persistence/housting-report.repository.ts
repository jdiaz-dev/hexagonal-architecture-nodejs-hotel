export interface HoustingReportRepository {
    createHoustingReport(houstingId:number, saleReportId:number|null, moneyTotal:number):Promise<any>
}