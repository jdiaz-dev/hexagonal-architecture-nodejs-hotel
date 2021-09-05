import { Service } from "typedi";
import { CashPersistenceAdapter } from "../../adapters/out/persistence/cash-persitence.adapter";

import { GetCashNotClosedRequest } from "../ports/in/get-cash-not-closed.request";
import { GetCashNotClosedPort } from "../ports/out/self-domain/get-cash-not-closed";

@Service()
export class GetCashNotClosedService implements GetCashNotClosedRequest {
  private getCashNotClosedPort: GetCashNotClosedPort;

  constructor(cashPersistenceAdapter: CashPersistenceAdapter) {
    this.getCashNotClosedPort = cashPersistenceAdapter;
  }
  async getTheCashNotClosed(hotelId: number): Promise<any> {
    const cash = await this.getCashNotClosedPort.getCashNotClosed(hotelId);
    return cash;
  }
}
