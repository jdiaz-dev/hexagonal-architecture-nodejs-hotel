import { Service } from 'typedi'

import { UserDatabaseEntity } from './user-database-entity';
import { UserRepository } from './user.repository';
import { RoleDatabaseEntity } from '../../../roles/infraestructure/out/role-database.entity';
import { RoleORM } from '../../../roles/infraestructure/out/role.orm';
import { UserEntity } from '../../domain/user';

@Service()
export class UserORM implements UserRepository {

    constructor(private roleORM: RoleORM) { }

    async saveUser(dataUser: UserEntity): Promise<UserDatabaseEntity> {
        const role = await this.roleORM.searchRole(dataUser.getRole)

        const user = await UserDatabaseEntity.create(
            {
                names: dataUser.getNames,
                firstSurname: dataUser.getFirstSurname,
                secondSurname: dataUser.getSecondSurname,
                cellphone: dataUser.getCellphone,
                email: dataUser.getEmail,
                password: dataUser.getPassword,
                roleId: role.id
            }
        )


        /* const role = new RoleDatabaseEntity(
            {
                role:dataUser.role,
                userId:user.id
            }
        )
        await role.save()
         */
        return user
    }
    async getUserWithEmail(email: string): Promise<UserDatabaseEntity | any> {
        const user = await UserDatabaseEntity.findOne({ where: { email: email } })

        if (!user) return null
        return user.toJSON()
    }
    async getuserWithPk(id: number): Promise<any> {
        const user = await UserDatabaseEntity.findByPk(id, {
            include: 'role',
            attributes: { exclude: ['roleId'] }
        })

        if (!user) return null
        return user.toJSON()
    }
}