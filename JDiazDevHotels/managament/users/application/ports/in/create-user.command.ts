import { UserEntity } from '../../../domain/user';

export class CreateUserCommand {
    constructor(
        private user: UserEntity
    ) { }

    get getUser(): UserEntity {
        return this.user
    }
}