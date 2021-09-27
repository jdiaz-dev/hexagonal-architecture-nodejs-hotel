import { DataCash } from '../../../application/services/data-cash';
import { CashDomain } from '../../../domain/cash';

export interface CashRepository {
    createCash(hotelId: number, dataCash: DataCash): Promise<any>;
    getCash(cashId: number): Promise<any>;
    getCashNotClosed(hotelId: number): Promise<any>;
    updateClosingMoney(cash: CashDomain): Promise<any>;
}
