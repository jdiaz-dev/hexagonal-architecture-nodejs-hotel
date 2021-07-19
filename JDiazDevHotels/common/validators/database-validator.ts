import { Service } from "typedi";

import { CommonNeedUserFromUserBcontextPort } from './../ports/out/common-need-user-from-user-bcontext.port';
import { CommonNeedHotelFromHotelBcontextPort } from './../ports/out/common-need-hotel-from-hotel-bcontext.port';

import { GetUserService } from '../../managament/users/application/services/get-user.service';
import { GetHotelService } from '../../managament/hotels/application/services/get-hotel.service';
import { ValidateUserWithHotelPort } from './../ports/in/validateUserWithHotel.port';

@Service()
export class CommonValidator implements ValidateUserWithHotelPort {
    private commonNeedUserFromUserBcontext: CommonNeedUserFromUserBcontextPort
    private commonNeedHotelFromHotelBcontextPort: CommonNeedHotelFromHotelBcontextPort

    constructor(
        getUserService: GetUserService,
        getHotelService: GetHotelService
    ) {
        this.commonNeedUserFromUserBcontext = getUserService
        this.commonNeedHotelFromHotelBcontextPort = getHotelService
    }
    async checkIfHotelBelongsToClientApp(userId: number, hotelId: number): Promise<boolean> {
        const user = await this.commonNeedUserFromUserBcontext.getUser(userId)
        const hotel = await this.commonNeedHotelFromHotelBcontextPort.getHotel(hotelId)

        if (user.id !== hotel.user.id) {
            return false
        }
        return true
    }

}

