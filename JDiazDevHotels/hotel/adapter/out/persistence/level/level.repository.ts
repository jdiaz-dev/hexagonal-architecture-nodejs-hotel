export interface LevelRepository {
    saveLevel(nameLevel:string, hotelId:number):Promise<any>
}