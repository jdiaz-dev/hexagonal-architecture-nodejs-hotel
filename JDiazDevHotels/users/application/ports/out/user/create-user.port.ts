import { UserDatabaseEntity } from "../../../../adapter/out/persistence/user/user-database-entity";
import { UserEntity } from "../../../../domain/user";

export interface CreateUserPort {
    createUser(dataUser:UserEntity):Promise<UserDatabaseEntity>
}