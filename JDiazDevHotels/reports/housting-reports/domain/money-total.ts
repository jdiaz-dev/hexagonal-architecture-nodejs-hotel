import { MoneyPaidHoustingDomainEntity } from "./money-paid-housting";
import { MoneyPaidSaleReportDomainEntity } from "./money-paid-sale-report";

export class MoneyTotalDomainEntity {
    constructor(
        public moneyHousting: MoneyPaidHoustingDomainEntity,
        public moneySaleReport: MoneyPaidSaleReportDomainEntity|null
    ) { }
    calculateMoneyTotal(): number {
        let total = 0
        if(this.moneySaleReport !== null){
            if (this.moneyHousting.id !== this.moneySaleReport.houstingId) return 0

            total += this.moneyHousting.moneyPaid
            total += this.moneySaleReport.moneyPaid
        }else{
            total += this.moneyHousting.moneyPaid
        }
        return total

    }
}