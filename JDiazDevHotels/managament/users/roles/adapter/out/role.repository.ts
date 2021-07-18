import { RoleDatabaseEntity } from "./role-database.entity";

export interface roleDatabase {
    role: string
}

export interface RoleRepository {
    saveRole(_role: string): Promise<RoleDatabaseEntity>
    searchRole(_role: string): Promise<RoleDatabaseEntity | any>
}