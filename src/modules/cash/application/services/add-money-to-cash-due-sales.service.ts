import { Service } from 'typedi';
import { CashPersistenceAdapter } from '../../adapters/out/persistence/cash-persitence.adapter';
import { CashDomain } from '../../domain/cash';
import { GetCashModeledForSelfDomainPort } from '../ports/out/self-domain/get-cash-modeled-for-self-domain.port';
import { UpdateClosingMoneyPort } from '../ports/out/self-domain/udpate-closing-money.port';

import { AddMoneyToCashDueSalesUseCase } from '../ports/in/add-money-to-cash-due-products-use-case';

@Service()
export class AddMoneyToCashDueSalesService implements AddMoneyToCashDueSalesUseCase {
    private getCashModeledForSelfDomainPort: GetCashModeledForSelfDomainPort;
    private updateClosingMoneyPort: UpdateClosingMoneyPort;

    constructor(cashPersistenceAdapter: CashPersistenceAdapter) {
        this.getCashModeledForSelfDomainPort = cashPersistenceAdapter;
        this.updateClosingMoneyPort = cashPersistenceAdapter;
    }
    async addMoneyToCashDueProducts(cashId: number, productsSaled: Array<any>): Promise<number> {
        let moneyTotalAdded = 0;
        const cash: CashDomain = await this.getCashModeledForSelfDomainPort.getCashModeledForSelfDomain(cashId);

        let money;
        for (let x = 0; x < productsSaled.length; x++) {
            money = productsSaled[x].totalPrice;
            cash.addMoney(money);
            moneyTotalAdded += money;
        }

        await this.updateClosingMoneyPort.updateClosingMoney(cash);
        return moneyTotalAdded;
    }
}
