import { Service } from 'typedi'

//from another Bcontext
import { GetUserService } from '../../../users/users/application/services/get-user.service';


import { CreateHotelPort } from '../ports/out/create-hotel.port';
import { CreateHotelCommand } from '../ports/in/create-hotel.command';
import { CreateNewHotelRequest } from '../ports/in/create-new-hotel.request';
import { HotelPersistenceAdapter } from '../../adapters/out/persistence/hotel-persistence.adapter';
import { HotelDatabaseEntity } from '../../adapters/out/persistence/hotel-mysql.database-entity';
import { HotelBcontextNeedUserFromUserBcontext } from '../ports/out/hotel-bcontext-need-user-from-user-bcontext';

@Service()
export class CreateHotelService implements CreateNewHotelRequest {
    private hotelBcontextNeedUserFromUserBcontext: HotelBcontextNeedUserFromUserBcontext

    private createHotelPort: CreateHotelPort

    constructor(
        hotelPersistenceAdapter: HotelPersistenceAdapter,
        getUserService: GetUserService) {
        this.createHotelPort = hotelPersistenceAdapter
        this.hotelBcontextNeedUserFromUserBcontext = getUserService
    }
    async createNewHotel(command: CreateHotelCommand, clientId: number, id: number): Promise<HotelDatabaseEntity | any> {

        const adminRole: boolean = await this.hotelBcontextNeedUserFromUserBcontext.checkIfIsAdmin(id)

        if (!adminRole) {
            return { message: 'You cannot create an hotel.' }
        }

        const hotel = command.getHotel
        const user = await this.hotelBcontextNeedUserFromUserBcontext.getUser(clientId)

        if (!user) {
            return { message: 'Impossible to register an hotel for this user.' }
        }

        const hotelCreated = await this.createHotelPort.createHotel(hotel, user.id)
        return hotelCreated
    }

}


