import { Service } from "typedi";

import { GetHotelRequest } from '../ports/in/get-hotel.request';
import { CommonNeedHotelFromHotelBcontextPort } from '../../../../common/ports/out/common-need-hotel-from-hotel-bcontext.port';
import { GetHotelPort } from '../ports/out/get-hotel.port';
import { HotelPersistenceAdapter } from '../../adapters/out/persistence/hotel-persistence.adapter';
import { GetHotelForRoomCategoryDomain } from '../../../../rooms/room-category/application/ports/out/other-domain/get-hotel-for-room-category-domain';
import { GetHotelForClientDomain } from "../../../../clients/application/ports/out/other-domain/get-hotel-for-client-domain";
import { GetHotelForCashDomain } from "../../../../cash/application/ports/out/other-domain/get-hotel-for-cash-domain";
import { GetHotelForProductDomain } from "../../../../products/application/ports/out/other-domain/get-product-for-product-domain";

@Service()
export class GetHotelService implements 
        GetHotelRequest, 
        CommonNeedHotelFromHotelBcontextPort,
        GetHotelForRoomCategoryDomain,
        GetHotelForClientDomain,
        GetHotelForProductDomain,
        GetHotelForCashDomain {

    private getHotelPort:GetHotelPort

    constructor(hotelPersistenceAdapter:HotelPersistenceAdapter){
        this.getHotelPort = hotelPersistenceAdapter 
    }
    async getHotel(id:number):Promise<any>{
        const hotel = await this.getHotelPort.findHotel(id)
        return hotel
    }
    async getHotelForRoomCategoryDomain(hotelId:number):Promise<any>{
        const hotel = await this.getHotelPort.findHotel(hotelId)
        return hotel
    }
    async getHotelForClientDomain(hotedlId:number):Promise<any>{
        const hotel = await this.getHotelPort.findHotel(hotedlId)
        return hotel
    }
    async getHotelForProductDomain(hotelId: number): Promise<any>{
        const hotel = await this.getHotelPort.findHotel(hotelId)
        return hotel
    }
    async getHotelForCashDomain(hotelId:number):Promise<any>{
        const hotel = await this.getHotelPort.findHotel(hotelId)
        return hotel
    }

}