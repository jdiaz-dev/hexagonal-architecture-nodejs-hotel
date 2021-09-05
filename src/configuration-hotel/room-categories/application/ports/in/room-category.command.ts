export class RoomCategoryCommand {
    constructor(private hotelId:number){}

    get getHotelId(){
        return this.hotelId
    }
}