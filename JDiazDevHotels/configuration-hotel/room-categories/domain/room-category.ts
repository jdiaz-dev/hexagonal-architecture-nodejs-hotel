export class RoomCategoryDomainEntity {
    constructor(
        private hotelId:number
    ){}
    checkIfRoomCategoryBelongsToHotel(hotelId:number){
        if(this.hotelId !== hotelId) return false
        return true
    }
}