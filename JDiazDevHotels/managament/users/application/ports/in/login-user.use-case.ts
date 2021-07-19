import { CreateUserCommand } from "./create-user.command";

export interface LoginUserUseCase {
    loginUser(user: CreateUserCommand): Promise<string | any>
}