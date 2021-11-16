export class ClientDomainEntity {
    constructor(
        private hotelId:number
    ){}
    checkIfClientBelongsToHotel(hotelId:number){
        if(this.hotelId !== hotelId) return false
        return true
    }
}