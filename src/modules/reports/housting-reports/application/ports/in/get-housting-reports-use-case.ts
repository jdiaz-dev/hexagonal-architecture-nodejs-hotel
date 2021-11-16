export interface IGetHoustingReportsUseCase {
    getTheHoustingReports(cashId: number): Promise<any>;
}
