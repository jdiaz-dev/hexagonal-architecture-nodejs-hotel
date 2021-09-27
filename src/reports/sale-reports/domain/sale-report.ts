export class SaleReportDomain {
    constructor(private saleReportId: number, private moneyTotal: number) {}
    addMoney(moneyToAdd: number) {
        this.moneyTotal += moneyToAdd;
    }
    get getSaleReportId() {
        return this.saleReportId;
    }
    get getMoneyTotal() {
        return this.moneyTotal;
    }
}
