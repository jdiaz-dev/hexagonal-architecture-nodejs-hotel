export interface SaleReportRepository {
    createSaleReport(moneyTotal:number):Promise<any>
    getSaleReport(houstingId:number):Promise<any>
}