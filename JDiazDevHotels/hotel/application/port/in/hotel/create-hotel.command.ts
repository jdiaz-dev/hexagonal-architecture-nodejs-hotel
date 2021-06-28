import { HotelEntity } from "../../../../domain/hotel"

export class CreateHotelCommand {
    private hotel:HotelEntity
    
    constructor(hotel:HotelEntity){
        this.hotel = hotel
    }

    get getHotel(){
        return this.hotel
    }

}


