export class HotelLevelCommand {
    constructor(
        private hotelId:number
    ){}
    get getHotelId(){
        return this.hotelId
    }
}