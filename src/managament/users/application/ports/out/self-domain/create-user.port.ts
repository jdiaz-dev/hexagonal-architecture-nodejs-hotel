import { UserDatabaseEntity } from "../../../../adapters/out/user-database-entity";
import { UserEntity } from "../../../../domain/user";

export interface CreateUserPort {
  createUser(dataUser: UserEntity): Promise<UserDatabaseEntity>;
}
