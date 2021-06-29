import { Service } from "typedi";
import { GetHotelRequest } from '../ports/in/get-hotel.request';
import { CommonNeedHotelFromHotelBcontextPort } from '../../../../common/ports/out/common-need-hotel-from-hotel-bcontext.port';
import { GetHotelPort } from '../ports/out/get-hotel.port';
import { HotelPersistenceAdapter } from '../../adapters/out/persistence/hotel-persistence.adapter';

@Service()
export class GetHotelService implements 
        GetHotelRequest, 
        CommonNeedHotelFromHotelBcontextPort {

    private getHotelPort:GetHotelPort

    constructor(hotelPersistenceAdapter:HotelPersistenceAdapter){
        this.getHotelPort = hotelPersistenceAdapter 
    }
    async getHotel(id:number):Promise<any>{
        const hotel = await this.getHotelPort.findHotel(id)
        return hotel
    }

}