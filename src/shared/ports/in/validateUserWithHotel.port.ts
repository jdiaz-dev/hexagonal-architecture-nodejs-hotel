export interface ValidateUserWithHotelPort {
    checkIfHotelBelongsToClientApp(userId:number, hotelId:number):Promise<boolean>
}