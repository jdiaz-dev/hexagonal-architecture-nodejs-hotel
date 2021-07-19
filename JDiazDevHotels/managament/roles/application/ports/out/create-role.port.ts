import { RoleDatabaseEntity } from '../../../infraestructure/out/role-database.entity';

export interface CreateRolePort {
    createRole(role: string): Promise<RoleDatabaseEntity>
}