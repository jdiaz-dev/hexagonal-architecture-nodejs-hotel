export class RoomDomain {
    constructor(private hotelId: number | null) {}
    checkIfRoomLevelBelognsToHotel(hotelId: number): boolean {
        if (hotelId !== this.hotelId) return false;
        return true;
    }
    checkIfRoomCategoryBelongsToHotel(hotelId: number): boolean {
        if (hotelId !== this.hotelId) return false;
        return true;
    }
    checkIfExistsRoomCondition(condition: any) {
        if (!condition) return false;
        return true;
    }
    get getHoteId() {
        return this.hotelId;
    }
}
