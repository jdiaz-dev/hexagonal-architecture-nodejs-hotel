export interface GetHotelByUserIdPort {
    findHotelByUserId(hotelId: number): Promise<any>
}