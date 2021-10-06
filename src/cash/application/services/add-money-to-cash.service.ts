import { Service } from 'typedi';
import { CashPersistenceAdapter } from '../../adapters/out/persistence/cash-persitence.adapter';
import { CashDomain } from '../../domain/cash';
import { GetCashModeledForSelfDomainPort } from '../ports/out/self-domain/get-cash-modeled-for-self-domain.port';
import { UpdateClosingMoneyPort } from '../ports/out/self-domain/udpate-closing-money.port';

import { AddMoneyToCashDueHoustingUseCase } from '../ports/in/add-money-to-cash-due-housting-use-case';
import { AddMoneyToCashDueProductsUseCase } from './../ports/in/add-money-to-cash-due-products-use-case';

@Service()
export class AddMoneyToCashService implements AddMoneyToCashDueHoustingUseCase, AddMoneyToCashDueProductsUseCase {
    private getCashModeledForSelfDomainPort: GetCashModeledForSelfDomainPort;
    private updateClosingMoneyPort: UpdateClosingMoneyPort;

    constructor(cashPersistenceAdapter: CashPersistenceAdapter) {
        this.getCashModeledForSelfDomainPort = cashPersistenceAdapter;
        this.updateClosingMoneyPort = cashPersistenceAdapter;
    }
    async addMoneyToCashDueHousting(cashId: number, moneyToAdd: number) {
        const cash: CashDomain = await this.getCashModeledForSelfDomainPort.getCashModeledForSelfDomain(cashId);
        cash.addMoney(moneyToAdd);
        await this.updateClosingMoneyPort.updateClosingMoney(cash);
    }
    async addMoneyToCashDueProducts(cashId: number, productsSaled: Array<any>) {
        const cash: CashDomain = await this.getCashModeledForSelfDomainPort.getCashModeledForSelfDomain(cashId);

        for (let x = 0; x < productsSaled.length; x++) {
            cash.addMoney(productsSaled[x].totalPrice);
        }
        await this.updateClosingMoneyPort.updateClosingMoney(cash);
    }
}
