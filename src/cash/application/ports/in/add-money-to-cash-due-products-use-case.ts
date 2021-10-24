export interface AddMoneyToCashDueSalesUseCase {
    addMoneyToCashDueProducts(cashId: number, productsSaled: Array<any>): Promise<number>;
}
