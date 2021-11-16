import { RoleDatabaseEntity } from "../../../adapters/out/role-database.entity";

export interface CreateRolePort {
  createRole(role: string): Promise<RoleDatabaseEntity>;
}
