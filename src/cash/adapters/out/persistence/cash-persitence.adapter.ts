import { Service } from 'typedi';
import { CreateCashPort } from '../../../application/ports/out/self-domain/create-cash.port';
import { DataCash } from '../../../application/services/data-cash';
import { CashORM } from './cash.orm';
import { GetCashPort } from '../../../application/ports/out/self-domain/get-cash.port';
import { GetCashNotClosedPort } from '../../../application/ports/out/self-domain/get-cash-not-closed';
import { CashMapper } from './cash.mapper';
import { CashDomain } from '../../../domain/cash';

import { CashModel } from './cash.model';
import { GetCashModeledForSelfDomainPort } from '../../../application/ports/out/self-domain/get-cash-modeled-for-self-domain.port';
import { UpdateClosingMoneyPort } from '../../../application/ports/out/self-domain/udpate-closing-money.port';

@Service()
export class CashPersistenceAdapter
    implements
        CreateCashPort,
        GetCashPort,
        GetCashNotClosedPort,
        GetCashModeledForSelfDomainPort,
        UpdateClosingMoneyPort
{
    constructor(private cashORM: CashORM, private cashMapper: CashMapper) {}

    async createCash(hotelId: number, dataCash: DataCash): Promise<any> {
        const cash = await this.cashORM.createCash(hotelId, dataCash);
        return cash;
    }
    async getCash(cashId: number): Promise<CashModel> {
        const cash = await this.cashORM.getCash(cashId);
        return cash;
    }
    async getCashNotClosed(hotelId: number): Promise<any> {
        const cashNotClosed = await this.cashORM.getCashNotClosed(hotelId);
        return cashNotClosed;
    }
    async getCashModeledForSelfDomain(cashId: number): Promise<CashDomain> {
        const cash = await this.cashORM.getCash(cashId);
        return this.cashMapper.mapForSelfDomain(cash);
    }
    async updateClosingMoney(cashDomain: CashDomain): Promise<any> {
        const cash = await this.cashORM.updateClosingMoney(cashDomain);
        return cash;
    }
}
