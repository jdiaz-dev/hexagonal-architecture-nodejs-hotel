import { Service } from 'typedi';

import { LoginUserUseCase } from '../ports/in/login-user.use-case';
import { FindUserPort } from '../ports/out/self-domain/find-user.port';
import { UserPersistenceAdapter } from '../../adapters/out/user-persistence.adapter';
import { generateJWT } from './generate-jwt';
import { CreateUserCommand } from '../ports/in/create-user.command';
import { GetHotelForUsersDomain } from '../ports/out/other-domain/get-hotel-for-users-domain';
import { GetHotelService } from '../../../hotels/application/services/get-hotel.service';
import { SETTINGS } from '../../../../shared/settings/settings';

@Service()
export class LoginUserService implements LoginUserUseCase {
    private findUserPort: FindUserPort;
    private getHotelForUsersDomain: GetHotelForUsersDomain;

    constructor(userPersistenceAdapter: UserPersistenceAdapter, getHotelService: GetHotelService) {
        this.findUserPort = userPersistenceAdapter;
        this.getHotelForUsersDomain = getHotelService;
    }

    async loginUser(command: CreateUserCommand): Promise<string | any> {
        const user = await this.findUserPort.findUserWithEmail(command.getUser.getEmail);

        if (!user) return { message: 'Forbidden to access the system' };

        if (user.state == false) {
            return {
                message: 'You cannot access to the system, please speak with the admin',
            };
        }

        const validPassword = command.getUser.decodePassword(user.password);
        if (!validPassword) {
            return { message: 'Invalid password' };
        }

        let hotel;
        if (user.roleId !== SETTINGS.base.roles.adminRoleId) {
            hotel = await this.getHotelForUsersDomain.getHotelForUsersDomain(user.id);
        }

        const token = await generateJWT(user);

        if (!hotel && user.roleId !== SETTINGS.base.roles.adminRoleId) {
            return { message: 'You has not an hotel registered, please request one' };
        } else if (hotel) {
            return {
                token,
                hotelId: hotel.id,
            };
        }

        //adminn
        return {
            token,
            message: 'wellcome pol',
        };
    }
}
