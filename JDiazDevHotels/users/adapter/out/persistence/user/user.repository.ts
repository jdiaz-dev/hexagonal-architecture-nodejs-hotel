import { UserDatabaseEntity } from './user-database-entity';

export interface UserRepository {
    saveUser(data:any):Promise<UserDatabaseEntity> 
    getUserWithEmail(email:string):Promise<UserDatabaseEntity|any>  
    getuserWithPk(id:number):Promise<any>
}