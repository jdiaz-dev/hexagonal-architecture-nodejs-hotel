import { Service } from 'typedi'
import { Request, Response} from 'express'

import { CreateNewUserUseCase } from '../../application/ports/in/user/create-new-user.use-case'
import { CreateUserService } from '../../application/service/users/create-user.service';
import { CreateUserCommand } from '../../application/ports/in/user/create-user.command';
import { UserEntity } from '../../domain/user';
import { LoginUserUseCase } from './../../application/ports/in/user/login-user.use-case';
import { LoginUserService } from './../../application/service/users/login-user.service';

@Service()
export class UserController {
    private loginUserUseCase:LoginUserUseCase
    private createNewUserUseCase:CreateNewUserUseCase

    constructor(
        loginUserService:LoginUserService,    
        createUserService:CreateUserService,
    ){
        this.loginUserUseCase = loginUserService
        this.createNewUserUseCase = createUserService 
    }
    loginUser = async (req:Request, res:Response) => {
        const { email,  password } = req.body
        const command = new CreateUserCommand(
            new UserEntity(
                '', 
                '', 
                '',  
                '', 
                email, 
                '',
                password)
        )
        const token = await this.loginUserUseCase.loginUser(command)
        res.json(token)
    }
    createUser = async (req:Request|any, res:Response) => {
        const { names, firstSurname, secondSurname, cellphone, email, role, password } = req.body
        const command = new CreateUserCommand(
            new UserEntity(
                names, 
                firstSurname, 
                secondSurname,  
                cellphone, 
                email, 
                role,
                password)
        )

        console.log(req.user)
        const user = await this.createNewUserUseCase.createNewUser(command)
        res.json(user)
    }
    
}