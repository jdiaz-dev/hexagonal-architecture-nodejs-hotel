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
import { IGetCashWithDailyReportQuery } from '../../../application/ports/in/get-cash-with-daily-report.query';
import { ICashRepository } from './cash-repository';
import { ICloseCashQuery } from '../../../application/ports/in/close-cash.query';
import { IQueries } from '../../../../../shared/interfaces/query.interface';

@Service()
export class CashPersistenceAdapter
    implements
        CreateCashPort,
        GetCashPort,
        GetCashNotClosedPort,
        GetCashModeledForSelfDomainPort,
        IGetCashWithDailyReportQuery,
        UpdateClosingMoneyPort,
        ICloseCashQuery
{
    private cashRepository: ICashRepository;

    constructor(cashORM: CashORM, private cashMapper: CashMapper) {
        this.cashRepository = cashORM;
    }

    async createCash(hotelId: number, dataCash: DataCash): Promise<any> {
        const cash = await this.cashRepository.createCash(hotelId, dataCash);
        return cash;
    }
    async getCash(cashId: number): Promise<CashModel> {
        const cash = await this.cashRepository.getCash(cashId);
        return cash;
    }
    async getCashNotClosed(hotelId: number): Promise<any> {
        const cashNotClosed = await this.cashRepository.getCashNotClosed(hotelId);
        return cashNotClosed;
    }
    async getCashModeledForSelfDomain(cashId: number): Promise<CashDomain> {
        const cash = await this.cashRepository.getCash(cashId);
        return this.cashMapper.mapForSelfDomain(cash);
    }
    async getTheCashWithDailyReport(hotelId: number, queries: IQueries): Promise<any> {
        return await this.cashRepository.getCashWithDailyReport(hotelId, queries);
    }

    async updateClosingMoney(cashDomain: CashDomain): Promise<any> {
        const cash = await this.cashRepository.updateClosingMoney(cashDomain);
        return cash;
    }
    closeTheCash(cashId: number) {
        return this.cashRepository.closeCash(cashId);
    }
}
