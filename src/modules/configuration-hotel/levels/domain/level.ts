export class LevelDomainEntity {
    constructor(
        private hotelId:number
    ){}
    checkIfLevelBelongsToHotel(hotelId:number){
        if(this.hotelId !== hotelId) return false
        return true 
    }
}