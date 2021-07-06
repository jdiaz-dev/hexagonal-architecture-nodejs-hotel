export interface UpdateMoneyPaidPort {
    updateMoneyPaid(houstingId:number, newMoney:number):Promise<any>
}