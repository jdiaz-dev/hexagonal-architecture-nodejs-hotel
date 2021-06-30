export interface GetHotelLevelsRequest {
    getLevelsOfHotel(clientAppId:number, hotelId:number):Promise<any>
}