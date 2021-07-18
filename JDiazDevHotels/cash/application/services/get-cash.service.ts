import { Service } from "typedi";
import { CreateCashRequest } from "../ports/in/create-cash.request";
import { DataCash } from "./data-cash";
import { CreateCashPort } from './../ports/out/self-domain/create-cash.port';
import { CashPersistenceAdapter } from "../../adapter/out/persistence/cash-persitence.adapter";
import { GetHotelForCashDomain } from "../ports/out/other-domain/get-hotel-for-cash-domain";
import { GetHotelService } from "../../../managament/hotels/application/services/get-hotel.service";
import { GetCashPort } from './../ports/out/self-domain/get-cash.port';
import { GetCashForHoustingDomain } from "../../../housting/application/ports/out/other-domain/get-cash-for-housting-domain";

@Service()
export class GetCashService implements GetCashForHoustingDomain {

    private getCashPort: GetCashPort

    constructor(
        cashPersistenceAdapter: CashPersistenceAdapter
    ) {
        this.getCashPort = cashPersistenceAdapter
    }
    async getCashForHoustingDomain(cashId: number): Promise<any> {
        const cash = await this.getCashPort.getCash(cashId)
        return cash
    }

}