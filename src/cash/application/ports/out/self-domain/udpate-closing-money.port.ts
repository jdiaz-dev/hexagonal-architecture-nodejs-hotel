import { CashDomain } from '../../../../domain/cash';

export interface UpdateClosingMoneyPort {
    updateClosingMoney(cash: CashDomain): Promise<any>;
}
