import { HotelEntity } from "./hotel"
import { Role } from "./role"

export class User {
    private names:string
    private surnames:string
    private username:string
    private cellphone:number
    private email:string
    private role:Role
    private hotel:HotelEntity

    constructor(
        names:string,
        surnames:string,
        username:string,
        cellphone:number,
        email:string,
        role:Role,
        hotel:HotelEntity
    ){
        this.names = names
        this.surnames = surnames 
        this.username = username
        this.cellphone = cellphone
        this.email = email
        this.role = role
        this.hotel = hotel
    }
}