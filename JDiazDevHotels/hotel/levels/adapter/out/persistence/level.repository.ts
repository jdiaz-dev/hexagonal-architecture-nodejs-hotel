export interface LevelRepository {
    saveLevel(nameLevel:string, hotelId:number):Promise<any>
    getLevels(hotelId:number):Promise<any>
    getLevel(levelId:number):Promise<any>
    updateLevel(nameLevel:string, levelId:number):Promise<any>
    removeHotelLevel(levelId:number):Promise<any>
}