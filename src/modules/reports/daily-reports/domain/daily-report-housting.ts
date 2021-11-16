export class DailyReportHousting {
    constructor(private dailyReportId: number, private moneyHousting: number, private moneyTotal: number) {}
    addMoneyToHousting(moneyToAdd: number) {
        this.moneyHousting += moneyToAdd;
        this.moneyTotal += moneyToAdd;
    }
    get getdailyReportId() {
        return this.dailyReportId;
    }
    get getMoneyHousting() {
        return this.moneyHousting;
    }
    get getMoneyTotal() {
        return this.moneyTotal;
    }
}
