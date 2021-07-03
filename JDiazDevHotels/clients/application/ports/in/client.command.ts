export class ClientCommand {
    constructor(
        private hotelId:number
    ){}
    get getHotelId(){
        return this.hotelId
    }
}
