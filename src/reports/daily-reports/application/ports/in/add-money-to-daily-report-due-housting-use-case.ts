export interface IAddMoneyToDailyReportDueHoustingUseCase {
    addMoneyDueHousting(hotelId: number, cashId: number, moneyToAdd: number): void;
}
