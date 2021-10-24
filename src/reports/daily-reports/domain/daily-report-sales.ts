export class DailyReportSales {
    constructor(private dailyReportId: number, private moneySales: number, private moneyTotal: number) {}
    addMoneyToSales(moneyToAdd: number) {
        this.moneySales += moneyToAdd;
        this.moneyTotal += moneyToAdd;
    }
    get getdailyReportId() {
        return this.dailyReportId;
    }
    get getMoneySales() {
        return this.moneySales;
    }
    get getMoneyTotal() {
        return this.moneyTotal;
    }
}
