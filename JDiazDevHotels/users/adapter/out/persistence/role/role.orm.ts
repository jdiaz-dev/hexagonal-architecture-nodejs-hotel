import { Service } from 'typedi'

import { RoleDatabaseEntity } from './role-database.entity';
import { roleDatabase, RoleRepository } from './role.repository';

@Service()
export class RoleORM implements RoleRepository{
    async saveRole(_role:string):Promise<RoleDatabaseEntity>{
        const role = new RoleDatabaseEntity(
            {
                nameRole:_role
            }
        )
        await role.save()
        return role
    }
    async searchRole(_role:string):Promise<RoleDatabaseEntity|any>{
        const role = await RoleDatabaseEntity.findOne({ where:{nameRole:_role}})
        return role
    }
}