import { Service } from 'typedi'

import { CreateRolePort } from '../../../../application/ports/out/role/create-role.port';
import { RoleDatabaseEntity } from './role-database.entity';
import { RoleRepository } from './role.repository';
import { RoleORM } from './role.orm';
import { FindRolePort } from '../../../../application/ports/out/role/find-role.port';

@Service()
export class RolePersistenceAdapter implements 
        CreateRolePort,
        FindRolePort {
    private roleRepository:RoleRepository

    constructor(roleORM:RoleORM){
        this.roleRepository = roleORM
    }
    async createRole(role:string):Promise<RoleDatabaseEntity>{        
        const roleCreated = await this.roleRepository.saveRole(role)
        return roleCreated
    }

    async findRole(_role:string){
        const role = await this.roleRepository.searchRole(_role)
        return role
    }
}