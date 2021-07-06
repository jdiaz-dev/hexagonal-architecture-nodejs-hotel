export interface CreateHoustingReportPort {
    createHoustingReport(houstingId:number, saleReportId:number|null, moneyTotal:number):Promise<any>
}