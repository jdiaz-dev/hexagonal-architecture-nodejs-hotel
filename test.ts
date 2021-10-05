/* class ProductSaledDomain {
    //private productId!: typeof ProductSaledDomain.ProductId;

    constructor(private productId: typeof ProductSaledDomain.ProductId.prototype, private productPrice: number) {}
    calculateTotalPrice(amountProducts: number): number {
        let totalPrice: number = 0;
        for (let x = 0; x < amountProducts; x++) {
            totalPrice += this.productPrice;
        }
        return totalPrice;
    }

    static ProductId = class {
        constructor(public value: number) {}
    };
}

const instancia = new ProductSaledDomain.ProductId(3);
instancia;
console.log(instancia.value);

const product = new ProductSaledDomain(instancia, 30);
product;
console.log(typeof product.productId.value);
 */
