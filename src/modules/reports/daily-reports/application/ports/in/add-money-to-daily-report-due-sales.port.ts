export interface IAddMoneyToDailyReportDueSalesUseCase {
    addMoneyDueSales(hotelId: number, cashId: number, moneyToAdd: number): void;
}
