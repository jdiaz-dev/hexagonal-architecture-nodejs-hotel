export interface SaleReportRepository {
    createSaleReport(moneyTotal:number):Promise<any>
}