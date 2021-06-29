export interface ValidateUserWithHotelPort {
    isValidUserWithHotel(userId:number, hotelId:number):Promise<boolean>
}