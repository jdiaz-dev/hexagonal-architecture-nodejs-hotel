import { Service } from 'typedi'
import { Request, Response } from 'express'

import { CreateNewRoleRequest } from '../../application/ports/in/role/create-new-role.request';
import { CreateRoleService } from '../../application/service/roles/create-role.service';

@Service()
export class RoleController {
    private createNewRoleRequest:CreateNewRoleRequest

    constructor(createRoleService:CreateRoleService){
        this.createNewRoleRequest = createRoleService
    }

    createRole = async(req: Request, res:Response) => {
        const { role } = req.body

        const roleCreated = await this.createNewRoleRequest.createNewRole(role)

        res.json(roleCreated)
    }
    
}

