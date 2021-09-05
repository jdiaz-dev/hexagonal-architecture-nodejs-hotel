import { MoneyPaidHoustingDomainEntity } from "../../../domain/money-paid-housting";

export interface CreateHoustingReportUseCase {
    createHoustingReport(houstingId:number):Promise<any>
}