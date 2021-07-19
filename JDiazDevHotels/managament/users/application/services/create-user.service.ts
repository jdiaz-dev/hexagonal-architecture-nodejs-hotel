import { Service } from 'typedi'

import { CreateNewUserUseCase } from '../ports/in/create-new-user.use-case';
import { CreateUserCommand } from '../ports/in/create-user.command';
import { CreateUserPort } from '../ports/out/self-domain/create-user.port';
import { UserPersistenceAdapter } from '../../infraestructure/out/user-persistence.adapter';
import { UserDatabaseEntity } from '../../infraestructure/out/user-database-entity';
import { FindRolePort } from '../../../roles/application/ports/out/find-role.port';
import { RolePersistenceAdapter } from '../../../roles/infraestructure/out/role-persistence.adapter';

@Service()
export class CreateUserService implements CreateNewUserUseCase {
    private createUserPort: CreateUserPort
    private findRolePort: FindRolePort

    constructor(
        userPersistenceAdapter: UserPersistenceAdapter,
        rolePersistenceAdapter: RolePersistenceAdapter
    ) {
        this.createUserPort = userPersistenceAdapter
        this.findRolePort = rolePersistenceAdapter
    }
    async createNewUser(command: CreateUserCommand): Promise<UserDatabaseEntity | string> {

        const user = command.getUser
        const role = await this.findRolePort.findRole(user.getRole)

        let response
        if (role) {
            user.encodePassword()
            response = await this.createUserPort.createUser(user)
        } else {
            response = 'An error has ocurred with the role.'
        }
        return response
    }
}