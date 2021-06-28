import { Service } from 'typedi';
import { CommonNeedUserFromUserBcontext } from '../../../../common/ports/out/get-user-for-token.port';
import { FindUserPort } from './../../ports/out/user/find-user.port';
import { UserPersistenceAdapter } from './../../../adapter/out/persistence/user/user-persistence.adapter';
import { HotelBcontextNeedUserFromUserBcontext } from '../../../../hotel/application/port/out/hotel/hotel-bcontext-need-user-from-user-bcontext';

@Service()
export class GetUserService implements 
        CommonNeedUserFromUserBcontext, 
        HotelBcontextNeedUserFromUserBcontext{
    private findUserPort:FindUserPort

    constructor(userPersistenceAdapter:UserPersistenceAdapter){
        this.findUserPort = userPersistenceAdapter
    }
    async getUser(id:number):Promise<any>{
        const user = await this.findUserPort.findUserWithPk(id)
        return user
    }
    async checkIfIsAdmin(id:number):Promise<boolean>{
        const admin = await this.findUserPort.findUserWithPk(id)

        if(admin.role.nameRole !== 'owner') return false
        return true
    }
}

