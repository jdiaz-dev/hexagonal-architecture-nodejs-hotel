export interface CreateLevelPort {
    createLevel(nameLevel:string, hotelId:number):Promise<any>
}