export class ProductCommand {
    constructor(
        private hotelId:number
    ){}
    get getHotelId(){
        return this.hotelId
    }
}