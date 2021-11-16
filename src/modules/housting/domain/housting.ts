export class HoustingDomainEntity {
    constructor(private cashId: number, private clientId: number, private roomId: number) {}
    checkIfCashBelongsToHousting(cashId: number) {
        if (this.cashId !== cashId) return false;
        return true;
    }
    checkIfClientBelongsToHousting(clientId: number) {
        if (this.clientId !== clientId) return false;
        return true;
    }
    checkIfRoomBelongsToHousting(roomId: number) {
        if (this.roomId !== roomId) return false;
        return true;
    }
}
