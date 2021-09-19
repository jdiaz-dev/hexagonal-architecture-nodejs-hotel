export interface ValidateUserWithHotelPort {
    checkIfHotelBelongsToUserApp(userId: number, hotelId: number): Promise<boolean>;
}
