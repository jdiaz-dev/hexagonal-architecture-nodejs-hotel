export interface IGetRoomConditionReportUseCase {
    getTheRoomConditionReport(hotelId: number): Promise<{}>;
}
