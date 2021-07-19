import { UserDatabaseEntity } from "../../../../infraestructure/out/user-database-entity";
import { UserEntity } from "../../../../domain/user";

export interface CreateUserPort {
    createUser(dataUser: UserEntity): Promise<UserDatabaseEntity>
}