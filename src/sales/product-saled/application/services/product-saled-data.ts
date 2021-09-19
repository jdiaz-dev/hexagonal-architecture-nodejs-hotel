export class DataProductSaled {
    constructor(
        public amount: number,
        public totalPrice: number,
        public date: string,
        public time: string,
        public payed: boolean,
    ) {}
}
