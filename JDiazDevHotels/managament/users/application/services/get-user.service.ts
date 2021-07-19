import { Service } from 'typedi';
import { CommonNeedUserFromUserBcontextPort } from '../../../../common/ports/out/common-need-user-from-user-bcontext.port';
import { FindUserPort } from '../ports/out/self-domain/find-user.port';
import { UserPersistenceAdapter } from '../../infraestructure/out/user-persistence.adapter';
import { HotelBcontextNeedUserFromUserBcontext } from '../../../hotels/application/ports/out/hotel-bcontext-need-user-from-user-bcontext';

@Service()
export class GetUserService implements
    CommonNeedUserFromUserBcontextPort,
    HotelBcontextNeedUserFromUserBcontext {
    private findUserPort: FindUserPort

    constructor(userPersistenceAdapter: UserPersistenceAdapter) {
        this.findUserPort = userPersistenceAdapter
    }
    async getUser(id: number): Promise<any> {
        const user = await this.findUserPort.findUserWithPk(id)
        return user
    }
    async checkIfIsAdmin(id: number): Promise<boolean> {
        const admin = await this.findUserPort.findUserWithPk(id)

        if (admin.role.nameRole !== 'owner') return false
        return true
    }
}

