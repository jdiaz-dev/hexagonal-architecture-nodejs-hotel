import { Service } from "typedi";

import { GetHotelRequest } from "../ports/in/get-hotel.request";
import { CommonNeedHotelFromHotelBcontextPort } from "../../../../shared/ports/out/common-need-hotel-from-hotel-bcontext.port";
import { GetHotelPort } from "../ports/out/get-hotel.port";
import { HotelPersistenceAdapter } from "../../adapters/out/persistence/hotel-persistence.adapter";
import { GetHotelForRoomCategoryDomain } from "../../../../configuration-hotel/room-categories/application/ports/out/other-domain/get-hotel-for-room-category-domain";
import { GetHotelForClientDomain } from "../../../../clients/application/ports/out/other-domain/get-hotel-for-client-domain";
import { GetHotelForCashDomain } from "../../../../cash/application/ports/out/other-domain/get-hotel-for-cash-domain";
import { GetHotelForProductDomain } from "../../../../sales/products/application/ports/out/other-domain/get-product-for-product-domain";
import { GetHotelForUsersDomain } from "../../../users/application/ports/out/other-domain/get-hotel-for-users-domain";
import { GetHotelByUserIdPort } from "../ports/out/get-hotel-by-user-id.port";

@Service()
export class GetHotelService
  implements
    GetHotelRequest,
    CommonNeedHotelFromHotelBcontextPort,
    GetHotelForRoomCategoryDomain,
    GetHotelForClientDomain,
    GetHotelForProductDomain,
    GetHotelForCashDomain,
    GetHotelForUsersDomain
{
  private getHotelPort: GetHotelPort;
  private getHotelByUserIdPort: GetHotelByUserIdPort;

  constructor(hotelPersistenceAdapter: HotelPersistenceAdapter) {
    this.getHotelPort = hotelPersistenceAdapter;
    this.getHotelByUserIdPort = hotelPersistenceAdapter;
  }
  async getHotel(id: number): Promise<any> {
    const hotel = await this.getHotelPort.findHotel(id);
    return hotel;
  }
  async getHotelForRoomCategoryDomain(hotelId: number): Promise<any> {
    const hotel = await this.getHotelPort.findHotel(hotelId);
    return hotel;
  }
  async getHotelForClientDomain(hotedlId: number): Promise<any> {
    const hotel = await this.getHotelPort.findHotel(hotedlId);
    return hotel;
  }
  async getHotelForProductDomain(hotelId: number): Promise<any> {
    const hotel = await this.getHotelPort.findHotel(hotelId);
    return hotel;
  }
  async getHotelForCashDomain(hotelId: number): Promise<any> {
    const hotel = await this.getHotelPort.findHotel(hotelId);
    return hotel;
  }
  async getHotelForUsersDomain(userId: number): Promise<any> {
    const hotel = await this.getHotelByUserIdPort.findHotelByUserId(userId);
    return hotel;
  }
}
