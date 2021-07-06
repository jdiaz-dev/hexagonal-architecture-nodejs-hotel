export class MoneySpentDomainEntity {
    constructor(
        public collectiontMoneySpent:number[] = []
    ){}
    calculateTotalMoneySpentInProducts():number{
        let totalMoney = 0
        this.collectiontMoneySpent.forEach( money => {
            totalMoney += money
        });
        return totalMoney
    }
}