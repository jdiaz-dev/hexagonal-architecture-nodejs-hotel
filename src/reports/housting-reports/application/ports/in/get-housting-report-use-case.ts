import { MoneyPaidHoustingDomainEntity } from '../../../domain/money-paid-housting';

export interface GetHoustingReportUseCase {
  getTheHoustingReport(cashId: number, houstingId: number): Promise<any>;
}
