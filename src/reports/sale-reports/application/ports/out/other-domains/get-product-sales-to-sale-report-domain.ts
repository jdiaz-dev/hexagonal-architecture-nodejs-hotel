import { MoneySpentDomainEntity } from "../../../../domain/money-spent";

export interface GetProductSalesToSaleReportDomain {
    getProductSalesToSaleReportDomain(houstingId:number):Promise<MoneySpentDomainEntity|boolean>
}