export interface IGetProductsSaledForReportPort {
    getProductsSaledForReport(cashId: number): Promise<any>;
}
