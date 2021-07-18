import { Service } from 'typedi'

import { CreateNewRoleRequest } from '../ports/in/create-new-role.request';
import { CreateRolePort } from '../ports/out/create-role.port';
import { RolePersistenceAdapter } from '../../adapter/out/role-persistence.adapter';

@Service()
export class CreateRoleService implements CreateNewRoleRequest {
    private createRolePort: CreateRolePort

    constructor(rolePersistenceAdapter: RolePersistenceAdapter) {
        this.createRolePort = rolePersistenceAdapter
    }

    async createNewRole(role: string) {

        const roleCreated = await this.createRolePort.createRole(role)
        return roleCreated
    }
}

