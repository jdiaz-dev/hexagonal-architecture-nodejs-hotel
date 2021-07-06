export class ProductSaleDomainEntity {
    constructor(
        private productPrice:number
    ){}
    calculateTotalPrice( amountProducts:number ):number{
        let totalPrice:number = 0
        for(let x = 0; x < amountProducts; x++){
            totalPrice += this.productPrice
        }
        return totalPrice
    }
}