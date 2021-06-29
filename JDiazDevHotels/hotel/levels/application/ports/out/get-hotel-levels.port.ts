export interface GetHotelLevelsPort {
    getLevels(hotelId:number):Promise<any>
    getLevel(hotelLevelId:number):Promise<any>
}