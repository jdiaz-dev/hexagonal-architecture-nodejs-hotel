import { Service } from "typedi";
import { CreateCashPort } from "../../../application/ports/out/self-domain/create-cash.port";
import { DataCash } from "../../../application/services/data-cash";
import { CashORM } from "./cash.orm";
import { GetCashPort } from '../../../application/ports/out/self-domain/get-cash.port';
import { GetCashNotClosedPort } from "../../../application/ports/out/self-domain/get-cash-not-closed";

@Service()
export class CashPersistenceAdapter implements
    CreateCashPort,
    GetCashPort,
    GetCashNotClosedPort {

    constructor(private cashORM: CashORM) { }

    async createCash(hotelId: number, dataCash: DataCash): Promise<any> {
        const cash = await this.cashORM.createCash(hotelId, dataCash)
        return cash
    }
    async getCash(cashId: number): Promise<any> {
        const cash = await this.cashORM.getCash(cashId)
        return cash
    }
    async getCashNotClosed(hotelId: number): Promise<any> {
        const cashNotClosed = await this.cashORM.getCashNotClosed(hotelId)
        return cashNotClosed
    }

}

