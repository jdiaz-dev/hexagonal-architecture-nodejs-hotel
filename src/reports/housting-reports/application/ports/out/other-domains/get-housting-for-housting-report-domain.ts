import { MoneyPaidHoustingDomainEntity } from "../../../../domain/money-paid-housting";

export interface GetHoustingForHoustingReportDomain {
  getHoustingForHoustingReportDomain(
    houstingId: number
  ): Promise<MoneyPaidHoustingDomainEntity>;
}
