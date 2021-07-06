import { MoneyPaidSaleReportDomainEntity } from "../../../../domain/money-paid-sale-report";

export interface GetSaleReportForHoustingReportDomain {
    getSaleReportForHoustingReportDomain(houstingId:number):Promise<MoneyPaidSaleReportDomainEntity|boolean>
}