export interface CreateNewHotelLevelRequest {
    createNewLevel(nameLevel:string, hotelId:number):Promise<any>
}