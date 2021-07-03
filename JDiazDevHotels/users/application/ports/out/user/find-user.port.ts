export interface FindUserPort {
    findUserWithEmail(email:string|number):any
    findUserWithPk(id:number):any
}