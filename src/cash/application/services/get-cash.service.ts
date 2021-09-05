import { Service } from "typedi";
import { CashPersistenceAdapter } from "../../adapters/out/persistence/cash-persitence.adapter";

import { GetCashPort } from "../ports/out/self-domain/get-cash.port";
import { GetCashForHoustingDomain } from "../../../housting/application/ports/out/other-domain/get-cash-for-housting-domain";

@Service()
export class GetCashService implements GetCashForHoustingDomain {
  private getCashPort: GetCashPort;

  constructor(cashPersistenceAdapter: CashPersistenceAdapter) {
    this.getCashPort = cashPersistenceAdapter;
  }
  async getCashForHoustingDomain(cashId: number): Promise<any> {
    const cash = await this.getCashPort.getCash(cashId);
    return cash;
  }
}
