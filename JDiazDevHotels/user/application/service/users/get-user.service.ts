import { Service } from 'typedi';
import { GetUserForTokenPort } from '../../../../common/ports/out/get-user-for-token.port';
import { FindUserPort } from './../../ports/out/user/find-user.port';
import { UserPersistenceAdapter } from './../../../adapter/out/persistence/user/user-persistence.adapter';

@Service()
export class GetUserService implements GetUserForTokenPort{
    private findUserPort:FindUserPort

    constructor(userPersistenceAdapter:UserPersistenceAdapter){
        this.findUserPort = userPersistenceAdapter
    }
    async getUserForToken(id:number):Promise<any>{
        const user = await this.findUserPort.findUserWithPk(id)
        return user
    }
}

