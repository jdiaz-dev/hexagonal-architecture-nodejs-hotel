export interface ICloseCashQuery {
    closeTheCash(cashId: number): Promise<any>;
}
