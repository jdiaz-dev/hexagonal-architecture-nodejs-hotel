import { CashDomain } from '../../../domain/cash';

export interface AddMoneyToCashDueHoustingUseCase {
    addMoneyToCashDueHousting(cashId: number, moneyToAdd: number): void;
}
