import { CashDomain } from '../../../../domain/cash';

export interface GetCashModeledForSelfDomainPort {
    getCashModeledForSelfDomain(cashId: number): Promise<CashDomain>;
}
