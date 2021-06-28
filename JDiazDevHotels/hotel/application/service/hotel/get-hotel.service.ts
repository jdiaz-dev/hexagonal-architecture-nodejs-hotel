import { Service } from "typedi";
import { GetHotelRequest } from './../../port/in/hotel/get-hotel.request';

@Service()
export class GetHotelService implements GetHotelRequest {
    constructor(){

    }
    async getHotel():Promise<any>{
        
    }

}