import { UserDatabaseEntity } from "../../../adapters/out/user-database-entity";
import { CreateUserCommand } from "./create-user.command";

export interface CreateNewUserUseCase {
  createNewUser(
    command: CreateUserCommand
  ): Promise<UserDatabaseEntity | string>;
}
