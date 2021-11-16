export interface UpdateMoneyPaidUseCase {
    updateMoneyPaid(houstingId:number, moneyToAdd:number):Promise<any>
}