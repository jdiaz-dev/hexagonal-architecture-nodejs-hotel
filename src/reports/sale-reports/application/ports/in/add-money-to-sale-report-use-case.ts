export interface AddMoneyToSaleReportUseCase {
    addMoneyToSaleReport(houstingId: number, productsSaled: Array<any>): Promise<any>;
}
