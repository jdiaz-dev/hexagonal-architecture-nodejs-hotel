export class HoustingReportDomain {
    constructor(private id: number, private moneyTotal: number) {}
    addMoney(moneyToAdd: number) {
        this.moneyTotal += moneyToAdd;
    }
    get getId() {
        return this.id;
    }
    get getMoneyTotal() {
        return this.moneyTotal;
    }
}
