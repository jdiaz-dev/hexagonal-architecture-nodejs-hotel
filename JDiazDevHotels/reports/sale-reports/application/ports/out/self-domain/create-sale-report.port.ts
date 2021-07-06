export interface CreateSaleReportPort {
    createSaleReport(moneyTotal:number):Promise<any>
}