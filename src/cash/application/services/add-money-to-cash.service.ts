import { Service } from 'typedi';
import { CashPersistenceAdapter } from '../../adapters/out/persistence/cash-persitence.adapter';
import { CashDomain } from '../../domain/cash';
import { GetCashModeledForSelfDomainPort } from '../ports/out/self-domain/get-cash-modeled-for-self-domain.port';
import { UpdateClosingMoneyPort } from '../ports/out/self-domain/udpate-closing-money.port';

@Service()
export class AddMoneyToCashService {
    private getCashModeledForSelfDomainPort: GetCashModeledForSelfDomainPort;
    private updateClosingMoneyPort: UpdateClosingMoneyPort;

    constructor(cashPersistenceAdapter: CashPersistenceAdapter) {
        this.getCashModeledForSelfDomainPort = cashPersistenceAdapter;
        this.updateClosingMoneyPort = cashPersistenceAdapter;
    }
    async addMoneyToCash(cashId: number, moneyToAdd: number) {
        /* for (let x = 2; x < 5; x++) {
            const cash: CashDomain = await this.getCashModeledForSelfDomainPort.getCashModeledForSelfDomain(
                cashId,
            );
            cash.addMoney(x);
            console.log('--------------cash domain', cash);
            await this.updateClosingMoneyPort.updateClosingMoney(cash);
        } */

        const cash: CashDomain = await this.getCashModeledForSelfDomainPort.getCashModeledForSelfDomain(cashId);
        cash.addMoney(moneyToAdd);
        await this.updateClosingMoneyPort.updateClosingMoney(cash);
    }
}
