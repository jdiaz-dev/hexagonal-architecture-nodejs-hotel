export class RoomData {
    private conditionId: number;

    constructor(
        private id: number,
        private name: string,
        private price: number,
        private details: string,
        private levelId: number,
        private categoryId: number,
    ) {
        this.conditionId = 1; //by default in config file also
    }
    get getRoomId() {
        return this.id;
    }
    get getName() {
        return this.name;
    }
    get getPrice() {
        return this.price;
    }
    get getDetails() {
        return this.details;
    }
    get getLevelId() {
        return this.levelId;
    }
    get getCategoryId() {
        return this.categoryId;
    }
    get getConditionId() {
        return this.conditionId;
    }
}
