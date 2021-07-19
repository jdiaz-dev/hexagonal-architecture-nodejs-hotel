import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

export class UserEntity {
    constructor(
        private names:string,
        private firstSurname:string,
        private secondSurname:string,
        private cellphone:string,
        private email:string,
        private role:string,
        private password:string

    ){}

    encodePassword():void{
        const salt = genSaltSync()
        const passwordEncoded = hashSync(this.password, salt)
        this.password = passwordEncoded
    }
    decodePassword(password:string):boolean{
        const validPassword = compareSync(this.password, password)
        return validPassword
    }

    get getNames(){
        return this.names
    }
    get getFirstSurname(){
        return this.firstSurname
    }
    get getSecondSurname(){
        return this.secondSurname
    }
    get getCellphone(){
        return this.cellphone
    }
    get getEmail(){
        return this.email
    }
    get getRole(){
        return this.role
    }
    get getPassword(){
        return this.password
    }

}