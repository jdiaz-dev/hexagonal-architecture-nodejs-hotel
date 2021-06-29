export interface CreateNewHotelLevelRequest {
    createNewLevel(nameLevel:string, hotelId:number, clientId:number):Promise<any>
}