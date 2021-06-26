import { RoleDatabaseEntity } from '../../../../adapter/out/persistence/role/role-database.entity';

export interface CreateRolePort {
    createRole(role:string): Promise<RoleDatabaseEntity>
}