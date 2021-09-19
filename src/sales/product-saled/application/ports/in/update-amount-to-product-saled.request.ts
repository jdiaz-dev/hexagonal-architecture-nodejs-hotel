export interface UpdateAmountToProductSaledUseCase {
    updateTheAmountToProductSaled(productSaledId:number, amountProducts:number):Promise<any>
}