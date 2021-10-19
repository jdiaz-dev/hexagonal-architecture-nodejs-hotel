export interface IGetProductsSaledForReportUseCase {
    getTheProductsSaledForReport(cashId: number): Promise<any>;
}
