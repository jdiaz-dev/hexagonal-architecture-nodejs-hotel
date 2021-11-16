import { MoneyPaidSaleReportDomainEntity } from './money-paid-sale-report';

export class MoneyTotalDomainEntity {
    constructor(public moneySaleReport: MoneyPaidSaleReportDomainEntity | null) {}
    calculateMoneyTotal(): number {
        /* let total = 0;
    if (this.moneySaleReport !== null) {
      if (this.moneyHousting.id !== this.moneySaleReport.houstingId) return 0;

      total += this.moneyHousting.price;
      total += this.moneySaleReport.moneyPaid;
    } else {
      total += this.moneyHousting.price;
    } */
        return 0;
    }
}
