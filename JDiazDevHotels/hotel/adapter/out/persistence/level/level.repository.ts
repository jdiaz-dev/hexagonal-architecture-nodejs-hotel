export interface LevelRepository {
    saveLevel(nameLevel:string, hotelId:number):Promise<any>
    getLevels(hotelId:number):Promise<any>
    getLevel(hotelLevelId:number):Promise<any>
}