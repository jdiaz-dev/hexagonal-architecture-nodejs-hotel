export class CashDomain {
    constructor(private id: number, private closingMoney: number) {}
    addMoney(moneyToAdd: number) {
        this.closingMoney += moneyToAdd;
    }
    get getId() {
        return this.id;
    }
    get getClosingMoney() {
        return this.closingMoney;
    }
}
