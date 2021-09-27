export interface CreateHoustingReportPort {
    createHoustingReport(cashId: number, houstingId: number, moneyToAdd: number): Promise<any>;
}
