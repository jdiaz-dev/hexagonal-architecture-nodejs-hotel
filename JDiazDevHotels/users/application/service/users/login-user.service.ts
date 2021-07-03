import { Service } from "typedi";

import { LoginUserUseCase } from "../../ports/in/user/login-user.use-case";
import { FindUserPort } from '../../ports/out/user/find-user.port';
import { UserPersistenceAdapter } from '../../../adapter/out/persistence/user/user-persistence.adapter';
import { generateJWT } from './generate-jwt';
import { CreateUserCommand } from '../../ports/in/user/create-user.command';


@Service()
export class LoginUserService implements LoginUserUseCase {
    private findUserPort:FindUserPort
    
    constructor(userPersistenceAdapter:UserPersistenceAdapter){
        this.findUserPort = userPersistenceAdapter
    }

    async loginUser(command:CreateUserCommand):Promise<string|any>{
        const user = await this.findUserPort.findUserWithEmail(command.getUser.getEmail)

        if(user.state == false){
            return { message:'You cannot access to the system, please speak with the admin' }
        }
        
        const validPassword = command.getUser.decodePassword(user.password)
        if(!validPassword){
            return { message:'Invalid password' }
        }
        
        const token = await generateJWT(user)
        return {token}
    }
}