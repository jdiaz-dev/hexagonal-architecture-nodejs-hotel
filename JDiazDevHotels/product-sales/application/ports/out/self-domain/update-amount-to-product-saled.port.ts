export interface UpdateAmountToProductSaledPort {
    updateAmountToProductSaled(productsSaledId:number, amountProducts:number, totalPrice:number):Promise<any>   
}