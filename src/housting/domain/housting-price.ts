export class HoustingPriceDomain {
    constructor(private priceRoom: number) {}

    calculateHoustingPrice(discountApplied: number) {
        return this.priceRoom - discountApplied;
    }
}
