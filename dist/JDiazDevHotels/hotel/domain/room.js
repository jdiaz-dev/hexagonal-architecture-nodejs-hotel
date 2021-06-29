"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomEntity = void 0;
class RoomEntity {
    constructor(roomData, hotelId) {
        this.roomData = roomData;
        this.hotelId = hotelId;
    }
    checkIfRoomLevelBelognsToHotel(hotelId) {
        if (hotelId !== this.hotelId)
            return false;
        return true;
    }
    checkIfRoomCategoryBelongsToHotel(hotelId) {
        if (hotelId !== this.hotelId)
            return false;
        return true;
    }
    checkIfExistsRoomCondition(condition) {
        if (!condition)
            return false;
        return true;
    }
    get getRoomData() {
        return this.roomData;
    }
    get getHoteId() {
        return this.hotelId;
    }
}
exports.RoomEntity = RoomEntity;
//# sourceMappingURL=room.js.map