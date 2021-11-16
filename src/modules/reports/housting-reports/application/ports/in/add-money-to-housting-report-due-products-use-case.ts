export interface AddMoneyToHoustingReportDueProductsUseCase {
    addMoneyToHoustingReportDueProducts(
        houstingId: number,
        producsSaledReportId: number,
        productsSaled: Array<any>,
    ): void;
}
