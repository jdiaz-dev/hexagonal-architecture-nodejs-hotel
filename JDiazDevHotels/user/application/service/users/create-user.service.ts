import { Service } from 'typedi'

import { CreateNewUserUseCase } from '../../ports/in/user/create-new-user.use-case';
import { CreateUserCommand } from '../../ports/in/user/create-user.command';
import { CreateUserPort } from '../../ports/out/user/create-user.port';
import { UserPersistenceAdapter } from '../../../adapter/out/persistence/user/user-persistence.adapter';
import { UserDatabaseEntity } from '../../../adapter/out/persistence/user/user-database-entity';
import { FindRolePort } from './../../ports/out/role/find-role.port';
import { RolePersistenceAdapter } from './../../../adapter/out/persistence/role/role-persistence.adapter';

@Service()
export class CreateUserService implements CreateNewUserUseCase{
    private createUserPort:CreateUserPort
    private findRolePort:FindRolePort

    constructor(
        userPersistenceAdapter:UserPersistenceAdapter,
        rolePersistenceAdapter:RolePersistenceAdapter    
    ){
        this.createUserPort = userPersistenceAdapter
        this.findRolePort = rolePersistenceAdapter
    }
    async createNewUser(command:CreateUserCommand):Promise<UserDatabaseEntity|string>{
        
        const user = command.getUser
        const role = await this.findRolePort.findRole(user.getRole)

        let response
        if(role){
            user.encodePassword()
            response = await this.createUserPort.createUser(user)
        }else{
            response = 'An error has ocurred with the role.'
        }
        return response
    }
}