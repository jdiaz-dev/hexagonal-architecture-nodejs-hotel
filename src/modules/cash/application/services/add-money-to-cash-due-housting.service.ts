import { Service } from 'typedi';
import { CashPersistenceAdapter } from '../../adapters/out/persistence/cash-persitence.adapter';
import { CashDomain } from '../../domain/cash';
import { GetCashModeledForSelfDomainPort } from '../ports/out/self-domain/get-cash-modeled-for-self-domain.port';
import { UpdateClosingMoneyPort } from '../ports/out/self-domain/udpate-closing-money.port';

import { AddMoneyToCashDueHoustingUseCase } from '../ports/in/add-money-to-cash-due-housting-use-case';
import { DailyReportPersistenceAdapter } from '../../../reports/daily-reports/adapters/out/daily-report-persistence.adapter';

@Service()
export class AddMoneyToCashService implements AddMoneyToCashDueHoustingUseCase {
    //self domian
    private getCashModeledForSelfDomainPort: GetCashModeledForSelfDomainPort;
    private updateClosingMoneyPort: UpdateClosingMoneyPort;

    //other domain
    constructor(
        cashPersistenceAdapter: CashPersistenceAdapter,

        //other domains
        dailyReportPersistenceAdapter: DailyReportPersistenceAdapter,
    ) {
        this.getCashModeledForSelfDomainPort = cashPersistenceAdapter;
        this.updateClosingMoneyPort = cashPersistenceAdapter;

        //other domains
    }
    async addMoneyToCashDueHousting(cashId: number, moneyToAdd: number) {
        const cash: CashDomain = await this.getCashModeledForSelfDomainPort.getCashModeledForSelfDomain(cashId);
        cash.addMoney(moneyToAdd);
        await this.updateClosingMoneyPort.updateClosingMoney(cash);
    }
}
