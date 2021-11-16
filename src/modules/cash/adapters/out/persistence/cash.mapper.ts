import { Service } from 'typedi';
import { CashDomain } from '../../../domain/cash';
import { CashModel } from './cash.model';

@Service()
export class CashMapper {
    mapForSelfDomain(cash: CashModel): CashDomain {
        return new CashDomain(cash.id, cash.closingMoney);
    }
}
