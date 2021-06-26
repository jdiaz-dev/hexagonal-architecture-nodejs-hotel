import { Service } from 'typedi'

import { RoleDatabaseEntity } from './role-database.entity';
import { roleDatabase, RoleRepository } from './role.repository';

@Service()
export class RoleORM implements RoleRepository{
    async saveRole(_role:string):Promise<RoleDatabaseEntity>{
        const role = new RoleDatabaseEntity(
            {
                role:_role
            }
        )
        await role.save()
        return role
    }
    async searchRole(_role:string):Promise<RoleDatabaseEntity|any>{
        const role = await RoleDatabaseEntity.findOne({ where:{role:_role}})
        return role
    }
}