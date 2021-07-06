export class ProductsSaledRelationDomainEntity {
    constructor(
        public cashId:number,
        public houstingId:number,
    ){}
    checkIfProductsSaledBelongsToCash(cashId:number):boolean{
        if(this.cashId !== cashId) return false
        return true
    }
    checkIfProductsSaledBelongsToHousting(houstingId:number):boolean{
        if(this.houstingId !== houstingId) return false
        return true
    }
}