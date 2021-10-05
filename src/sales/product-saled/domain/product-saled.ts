export class ProductSaledDomain {
    // private productId!: typeof ProductSaledDomain.ProductId.prototype;
    private totalPrice: number = 0;

    constructor(
        private productId: typeof ProductSaledDomain.ProductId.prototype,
        private productPrice: number,
        private ammount: number,
    ) {}

    calculateTotalPrice() {
        for (let x = 0; x < this.ammount; x++) {
            this.totalPrice += this.productPrice;
        }
    }
    get getProductId() {
        return this.productId;
    }
    get getTotalPrice() {
        return this.totalPrice;
    }
    get getAmmount() {
        return this.ammount;
    }

    static ProductId = class {
        constructor(public value: number) {}
    };
}
