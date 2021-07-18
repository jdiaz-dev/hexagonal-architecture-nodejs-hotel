import { Service } from 'typedi'

import { UserEntity } from '../../domain/user';
import { CreateUserPort } from '../../application/ports/out/create-user.port';
import { UserRepository } from './user.repository';
import { UserORM } from './user.orm';
import { UserDatabaseEntity } from './user-database-entity';
import { FindUserPort } from '../../application/ports/out/find-user.port';

@Service()
export class UserPersistenceAdapter implements
    CreateUserPort,
    FindUserPort {
    private userRepository: UserRepository

    constructor(userORM: UserORM) {
        this.userRepository = userORM
    }
    async createUser(dataUser: UserEntity): Promise<UserDatabaseEntity> {

        const userCreated = await this.userRepository.saveUser(dataUser)
        return userCreated
    }
    async findUserWithEmail(email: string) {
        const user = await this.userRepository.getUserWithEmail(email)
        return user
    }
    async findUserWithPk(id: number) {
        const user = await this.userRepository.getuserWithPk(id)
        return user
    }
}