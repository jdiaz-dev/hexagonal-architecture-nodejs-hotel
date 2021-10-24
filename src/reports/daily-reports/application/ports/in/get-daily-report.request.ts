export interface IGetDailyReportRequest {
    getTheDailyReport(hotelId: number, cashId: number): Promise<any>;
}
